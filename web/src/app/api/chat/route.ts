import { prisma } from "@/helpers/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET request to fetch the current chat's messages
export async function GET(req: NextRequest) {
    try {
        // Get the chatId
        const chatId = req.nextUrl.searchParams.get("chatId");

        if(!chatId) {
            return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
        }

        // Get the chat
        const chat = await prisma.chat.findUnique({
            where: {
                id: chatId
            }
        });

        // Get the messages for the chat
        const messages = await prisma.message.findMany({
            where: {
                chatId: chatId
            }
        });

        return NextResponse.json({ chat, messages });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch chat" }, { status: 500 });
    }
}

// Create a new chat
export async function POST(req: NextRequest) {
    try {
        // Get the chatBotId
        const chatBotId = req.nextUrl.searchParams.get("chatBotId");

        if(!chatBotId) {
            return NextResponse.json({ error: "ChatBot ID is required" }, { status: 400 });
        }

        // Check if there's a chatBot with that id
        const chatBot = await prisma.chatBot.findUnique({
            where: {
                id: chatBotId
            }
        });

        if(!chatBot) {
            return NextResponse.json({ error: "ChatBot not found" }, { status: 404 });
        }

        // Create the chat
        const newChat = await prisma.chat.create({
            data: {
                chatBotId: chatBotId
            }
        });

        // Return the chat data
        return NextResponse.json(newChat);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create chat" }, { status: 500 });
    }
}