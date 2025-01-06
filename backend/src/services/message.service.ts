import { ObjectId } from "mongoose";
import UserModel from "../models/user.model";
import MessageModel from "../models/message.model";
import { GetMessagesDto, SendMessageDto } from "../dtos";
import { getSocketId, io } from "../utils/socket";

export const getUserForSidebar = async (userId: ObjectId) => {
  const currentUser = userId;
  const filteredUser = await UserModel.find({
    _id: { $ne: currentUser },
  }).select("-password");
  return filteredUser;
};

export const getMessages = async (dto: GetMessagesDto) => {
  const { userId, userToChatId } = dto;
  const messages = await MessageModel.find({
    $or: [
      { senderId: userId, receiverId: userToChatId },
      {
        senderId: userToChatId,
        receiverId: userId,
      },
    ],
  });
  return messages;
};

export const sendMessage = async (dto: SendMessageDto) => {
  const newMessage = await MessageModel.create({
    ...dto,
  });
  const receiverSocketId = getSocketId(dto.receiverId);
  const senderSocketId = getSocketId(dto.senderId);
  if (receiverSocketId && senderSocketId) {
    io.to([receiverSocketId, senderSocketId]).emit("newMessage", newMessage);
  }
  return newMessage;
};
