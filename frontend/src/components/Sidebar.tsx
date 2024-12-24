import { useEffect, useState } from "react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { User } from "../types/interfaces/user.interace";
import { useSelectAuthOnlineUsers } from "../store/auth/selector";
import { authApi, messageApi } from "../services";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const Sidebar = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [receiver, setReceiver] = useState<User | null>(null);
  useEffect(() => {
    const handleGetReceiver = async () => {
      const receiver = await authApi.getUserProfile(param?.userId!);
      setReceiver(receiver);
    };
    if (param.userId) {
      handleGetReceiver();
    }
  }, []);
  const [allUsers, setAllUsers] = useState<User[] | []>([]);
  const onlineUsers = useSelectAuthOnlineUsers();

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await messageApi.getAllUsers();
      setAllUsers(users);
    };
    getAllUsers();
  }, []);
  const filteredUsers = showOnlineOnly
    ? allUsers?.filter((user) => onlineUsers.includes(user._id))
    : allUsers;
  if (isUsersLoading) return <SidebarSkeleton />;
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineUsers.length} online)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.length > 0 ? (
          filteredUsers?.map((user) => (
            <button
              key={user._id}
              onClick={() => navigate(`/${user._id}`)}
              className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${
                receiver && receiver?._id === user._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }
            `}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={
                    user.avatar ||
                    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                  }
                  alt={user.fullName}
                  className="size-12 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                  />
                )}
              </div>
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
