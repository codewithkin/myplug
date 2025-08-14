import { prisma } from "@/helpers/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET request to fetch messages for the current chat
export async function GET(req: NextRequest) {
    try {
        // Get the chatId
        const chatId = req.nextUrl.searchParams.get("chatId");

        if(!chatId) {
            return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
        }

        // Get the messages for the chat
        const messages = await prisma.message.findMany({
            where: {
                chatId: chatId
            }
        });

        return NextResponse.json(messages);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
    }
}

// POST request to create a new message
export async function POST(req: NextRequest) {
    try {
        // Get the chatId
        const chatId = req.nextUrl.searchParams.get("chatId");

        if(!chatId) {
            return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
        }

        // Get the message from the request body
        const { message } = await req.json();

        // Create the message
        const newMessage = await prisma.message.create({
            data: {
                chatId: chatId,
                content: message
            }
        });

        return NextResponse.json(newMessage);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create message" }, { status: 500 });
    }
}