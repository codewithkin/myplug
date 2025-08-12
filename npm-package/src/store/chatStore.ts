import { Message } from "@/types";
import { create } from "zustand";

type State = {
    messages: Message[];
    chatId?: string;
    chatBotId?: string;
}

type Actions = {
    setMessages: (messages: Message[]) => void;
    addMessage: (message: Message) => void;
    setChatId: (chatId: string) => void;
    setChatBotId: (chatBotId: string) => void;
}

export const useChatStore = create<State & Actions>((set) => ({
    messages: [],
    chatId: undefined,
    chatBotId: undefined,
    setMessages: (messages) => set({ messages }),
    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
    setChatId: (chatId) => set({ chatId }),
    setChatBotId: (chatBotId) => set({ chatBotId }),
}));