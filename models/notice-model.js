import { model, Schema } from "mongoose";

const NoticeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  notice: {
    type: String,
    required: true,
  },
  access: {
    type: [String],
  },
});


export const Notice = model("Notice", NoticeSchema);