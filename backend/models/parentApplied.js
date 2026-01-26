import mongoose from "mongoose";

const phoneValidator = (v) => /^\d{10}$/.test(v);

const TutorRequestSchema = new mongoose.Schema({
  uniqueId: { type: String, required: true, index: true },
  city: { type: String, default: null, trim: true, index: true },
  tutorName : {type: String, required: true},
  tutorUid : {type: String, required: true},
  tutorPhone: {type : String, required: true},
  parentName: { type: String, required: true, trim: true },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: phoneValidator,
      message: (props) => `${props.value} is not a valid phone number (expect 10 digits).`,
    },
  },


  address: { type: String, default: null, trim: true },
  notes: { type: String, default: null, trim: true },
  email: {
    type: String,
    default: null,
    trim: true,
    lowercase: true,
    // simple email sanitize; don't rely on this as full validation
    match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
  },
  status: {
    type: String,
    enum: ["new", "contacted",  "completed", ],
    default: "new",
    lowercase: true,
  },
}, { timestamps: true });

// add a compound index for faster searches by city + status
TutorRequestSchema.index({ city: 1, status: 1 });

export default mongoose.models.TutorRequest || mongoose.model("TutorRequest", TutorRequestSchema);
