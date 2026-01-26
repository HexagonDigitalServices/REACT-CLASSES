import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
  description : {
    type : String,
    required : true
  },
  amount : {
    type : Number,
    required : true
  },
  category: {
    type: String,
    required : true,
  },
  date: {
    type: Date,
    required : true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  type: {
    type: String,
    default: "income",  
  },
}, { timestamps: true });

const incomeModel = mongoose.models.income || mongoose.model("income", incomeSchema);

export default incomeModel;