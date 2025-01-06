import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { authApi, messageApi } from "../services";
import ChatHeader from "./ChatHeader";
import { Message } from "../types/interfaces/message.interace";
import { useSelectAuthUser } from "../store/auth/selector";
import MessageInput from "./MessageInput";
import { formatMessageTime } from "../lib/ultils";
import { User } from "../types/interfaces/user.interace";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useSocket } from "../contexts/SocketContext";

export interface Props {
  receiver: User;
}

const ChatContainer = (props: Props) => {
  const user = useSelectAuthUser();
  const { socket } = useSocket();
  const { receiver } = props;
  const [messages, setMessages] = useState<Message[]>([]);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [messageLoading, setMessageLoading] = useState(false);
  const subscribeToMessages = () => {
    if (!receiver) return;
    socket?.on("newMessage", (newMessage) =>
      setMessages((pre) => [...pre, newMessage])
    );
  };
  const unsubsribeFromMessages = () => {
    socket?.off("newMessage");
  };
  useEffect(() => {
    const handleGetMessages = async () => {
      const messages = await messageApi.getMessages(receiver._id);
      setMessages(messages);
    };
    setMessageLoading(true);
    handleGetMessages();
    setMessageLoading(false);
    console.log(receiver);
    if (receiver) {
      console.log("aaaaaa", socket);
      subscribeToMessages();
    }
    return () => {
      unsubsribeFromMessages();
    };
  }, [receiver, socket]);
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (messageLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader receiver={receiver} />
        <MessageSkeleton />
        <MessageInput receiver={receiver} />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader receiver={receiver} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((message) => (
          <div
            key={message.id}
            className={`chat ${
              message.senderId === user?._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === user?._id
                      ? user.avatar ||
                        "https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8="
                      : receiver?.avatar ||
                        "https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8="
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput receiver={receiver} />
    </div>
  );
};
export default ChatContainer;
