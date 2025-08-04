export type Plan = {
    name: string;
    chatBots: number;
    sites: number;
    dataFiles: number;
    price: number;
    monthlyMessagesPerChatbot: number;
}

export const plans: Plan[] = [
    {
        name: "Free",
        chatBots: 1,
        sites: 1,
        dataFiles: 1,
        price: 0,
        monthlyMessagesPerChatbot: 10
    },
    {
        name: "Pro",
        chatBots: 3,
        sites: 3,
        dataFiles: 15,
        price: 9.99,
        monthlyMessagesPerChatbot: 10000
    },
    {
        name: "Business",
        chatBots: 10,
        sites: 10,
        dataFiles: 100,
        price: 29.99,
        monthlyMessagesPerChatbot: 10000
    },
    {
        name: "Agency",
        chatBots: 100,
        sites: 100,
        dataFiles: 1000,
        price: 99.99,
        monthlyMessagesPerChatbot: 100000
    },
    {
        name: "Enterprise",
        chatBots: 10000,
        sites: 10000,
        dataFiles: 100000,
        price: 999.99,
        monthlyMessagesPerChatbot: 1000000
    }
]