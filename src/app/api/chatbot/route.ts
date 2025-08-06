import { plans } from "@/data/plans";
import { prisma } from "@/helpers/prisma";
import { NextRequest, NextResponse } from "next/server";
import createAssistant from "@/helpers/ai/assistant/createAssistant";
import checkAuthStatus from "@/helpers/server/checkAuthStatus";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import generatePurposePromptAssistant from "@/helpers/ai/assistant/generateAssistantPurposePrompt";
import getResponseFromAssistant from "@/helpers/ai/assistant/getResponseFromAssistant";

export async function POST(req: NextRequest) {

    try {
        const { name, purpose, websiteUrl } = await req.json() as { name: string, purpose: string, websiteUrl: string };

        checkAuthStatus(req);

        
        const session = await auth.api.getSession({
            headers: await headers()
        });

        const userId = session?.user.id;

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                chatBots: true
            }
        });

        // Check if the user has not exceeded their chatbot limit
        const plan = plans.find((plan) => plan.name.toLowerCase() === user?.plan.toLowerCase());

        if (!plan) {
            return NextResponse.json({
                message: "You have not selected a plan"
            }, { status: 400 })
        }

        if((user?.chatBots?.length || 0) >= plan.chatBots) {
            return NextResponse.json({
                message: "You have reached your chatbot limit"
            }, { status: 400 })
        }

        // Create a chatbot
        await prisma.chatBot.create({
            data: {
                name,
                websiteUrl,
                assistantId: "asst_01JF11111111111111111111",
                user: {
                    connect: {
                        id: userId
                    }
                },
                template: "default"
            }
        });

        return NextResponse.json({
            message: "Chatbot created successfully"
        }, { status: 200 })
    } catch (e) {
        console.log("An error occured while creating chatbot: ", e);

        return NextResponse.json({
            message: "An error occured while creating chatbot",
            error: e
        }, {
            status: 500
        })
    }
}