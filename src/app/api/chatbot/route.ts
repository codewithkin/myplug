import { plans } from "@/data/plans";
import { prisma } from "@/helpers/prisma";
import { NextRequest, NextResponse } from "next/server";
import createAssistant from "@/helpers/ai/assistant/createAssistant";
import checkAuthStatus from "@/helpers/server/checkAuthStatus";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import generatePurposePromptAssistant from "@/helpers/ai/assistant/generateAssistantPurposePrompt";

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

        // Create an assistant
        const assistantId = await createAssistant({
            assistantName: name,
            purpose
        })

        // Check if the assistant was created
        if(!assistantId) {
            return NextResponse.json({
                message: "Failed to create assistant"
            }, { status: 400 })
        }

        const refinedPurpose = await generatePurposePromptAssistant({
            website: websiteUrl,
            purpose,
            name
        })

        // Create a chatbot
        await prisma.chatBot.create({
            data: {
                name,
                purpose: refinedPurpose,
                websiteUrl,
                assistantId,
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