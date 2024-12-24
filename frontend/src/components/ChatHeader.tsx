import { X } from "lucide-react";
import { useSelectAuthOnlineUsers } from "../store/auth/selector";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "../types/interfaces/user.interace";

export interface Props {
  receiver: User;
}

const ChatHeader = (props: Props) => {
  const { receiver } = props;
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<User | null>();
  const onlineUsers = useSelectAuthOnlineUsers();
  useEffect(() => {
    setSelectedUser(receiver);
  }, [receiver]);
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center h-[44px] gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={
                  selectedUser?.avatar ||
                  "https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8="
                }
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium">{selectedUser?.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser?._id!) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <button onClick={() => navigate(`/`)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
