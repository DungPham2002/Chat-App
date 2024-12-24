import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useEffect, useState } from "react";
import { User } from "../types/interfaces/user.interace";
import { authApi } from "../services";
import { useParams } from "react-router-dom";

const HomePage = () => {
  const param = useParams();
  const userId = param.userId;
  const [receiver, setReceiver] = useState<User | null>();
  useEffect(() => {
    if (userId) {
      const handleGetReceiver = async () => {
        const receiver = await authApi.getUserProfile(userId!);
        setReceiver(receiver?.data);
      };
      handleGetReceiver();
    } else {
      setReceiver(null);
    }
  }, [param]);

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!receiver ? (
              <NoChatSelected />
            ) : (
              <ChatContainer receiver={receiver!} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
