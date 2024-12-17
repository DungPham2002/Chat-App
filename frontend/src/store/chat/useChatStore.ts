import { create } from "zustand";
import { User } from "../../types/interfaces/user.interace";

export interface IChatStore {
    messages: [],
    users: [],
    selectedUser: User | null
}


export const useChatStore = create<IChatStore>((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
}));
