import mongoose from "mongoose";

// Function to convert UTC to IST (used for timestamps)
function getISTDate() {
  const now = new Date();
  const istOffset = 5 * 60 * 60 * 1000 + 30 * 60 * 1000; // 5:30 hours in ms
  return new Date(now.getTime() + istOffset);
}

const REGISTRATION_FEE = Number(process.env.REGISTRATION_FEE || 1500);

const PaymentSubSchema = new mongoose.Schema(
  {
    id: { type: String, default: null },
    amount: { type: Number, required: true, default: REGISTRATION_FEE },
    currency: { type: String, default: "INR" },
    method: { type: String, default: null },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    }, // paid / unpaid
    paidAt: { type: Date, default: null },
  },
  { _id: false }
);

const TutorSchema = new mongoose.Schema(
  {
    // basic identity
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^\d{10}$/.test(value);
        },
        message: (props) =>
          `${props.value} is not a valid phone number! Must be 10 digits.`,
      },
    },

    // address & agreement
    address: { type: String, required: true },
    homeAddress: { type: String, required: true },
    agree: { type: Boolean, required: true },

    // auth
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return typeof value === "string" && value.length >= 8;
        },
        message: () => `Password must be at least 8 characters long.`,
      },
    },

    // location
    city: { type: String, required: true },
    area: { type: String, required: true },

    // classes & subjects (Map<className, [subjects]>)
   classSubjects: {
    // allow flexible input: array of { class: String, subject: String } or mixed structure
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },

    // profile & media (profilePicture optional: can be URL or saved path)
    profilePicture: { type: String, required: false, default: null },
    profilePictureName: { type: String, required: false, default: null },
    videoLink: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          try {
            new URL(value);
            return true;
          } catch (err) {
            return false;
          }
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },

    // personal & professional
    gender: { type: String, required: true },
    experienceYears: { type: Number, required: true },
    experienceMonths: { type: Number, required: true },
    collegeName: { type: String, required: true },
    graduationYear: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          const currentYear = new Date().getFullYear();
          return value >= 1900 && value <= currentYear;
        },
        message: (props) => `${props.value} is not a valid graduation year!`,
      },
    },
    major: { type: String, required: true },

    // descriptions
    selfDescription: { type: String, required: true },
    skillsDescription: { type: String, required: true },

    // front-end friendly fields
    uid: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^[0-9]{4}$/.test(value);
        },
        message: (props) =>
          `${props.value} is not a valid UID! UID must be exactly 4 numeric digits.`,
      },
    },

    // payment
    paymentInfo: { type: PaymentSubSchema, required: true, default: () => ({ id: null, amount: REGISTRATION_FEE, currency: "INR", method: null, paymentStatus: "unpaid", paidAt: null }) },

    // optional helper fields for admin/webflow
    sessionId: { type: String, default: null },
     lastLogin: { type: Date, default: null }
  },
  {
    timestamps: {
      currentTime: getISTDate, // Use IST for createdAt and updatedAt
    },
  }
);

// Indexes for fast lookups + uniqueness
TutorSchema.index({ email: 1 }, { unique: true, sparse: true });
TutorSchema.index({ phone: 1 }, { unique: true, sparse: true });
TutorSchema.index({ uid: 1 }, { unique: true });

// Pre-save normalization: email lowercase + trim, phone digits-only, pad uid
TutorSchema.pre("save", function (next) {
  try {
    if (this.email) this.email = String(this.email).toLowerCase().trim();
    if (this.phone) this.phone = String(this.phone).replace(/\D/g, "").slice(0, 10);
    if (this.uid) {
      // pad uid to 4 digits if numeric string is shorter (defensive)
      const uidStr = String(this.uid);
      if (/^\d+$/.test(uidStr)) {
        this.uid = uidStr.padStart(4, "0");
      } else {
        this.uid = uidStr;
      }
    }
  } catch (err) {
    // ignore normalization errors (validation will catch bad data)
  }
  next();
});

// Pre-update hook to adjust updatedAt for IST (keeps timestamps consistent on findOneAndUpdate)
TutorSchema.pre("findOneAndUpdate", function (next) {
  if (!this._update) this._update = {};
  this._update.updatedAt = getISTDate();
  next();
});

export default mongoose.models.Tutor || mongoose.model("Tutor", TutorSchema);
