import { Message } from "@/types";
import { create } from "zustand";

type State = {
    messages: Message[];
    chatId?: string;
    chatBotId?: string;
}

export const useChatStore = create<State>((set) => ({
    messages: [],
    chatId: undefined,
    chatBotId: undefined,
}));