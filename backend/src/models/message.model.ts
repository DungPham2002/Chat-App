import mongoose, { Schema } from "mongoose";

const MessageShema: Schema = new Schema(
  {
    senderId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: true,
    },
    receiverId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("Message", MessageShema);

export default MessageModel;
