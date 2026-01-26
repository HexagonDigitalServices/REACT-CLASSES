import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  jobId: { type: String, required: true },        // e.g. "J-1001"
  parentName: { type: String, required: true },   // frontend shows parent name frequently
  parentMobile: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value);
      },
      message: (props) => `${props.value} is not a valid phone number! Must be 10 digits.`,
    },
  },
  parentEmail: { type: String, required: true, default: null },
  classSubjects: { type: mongoose.Schema.Types.Mixed, default: [] }, // accepts array or object
  address: { type: String, required: true },       // area
  city: { type: String, required: true },
  notes: { type: String, required: true, default: null }, // job description
}, { timestamps: true });

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
