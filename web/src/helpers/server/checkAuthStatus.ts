import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../prisma";

export default async function checkAuthStatus (req: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    // Get the user's id
    const userId = session?.user.id;

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if(!userId || !user) {
        return NextResponse.json({
            message: "Sorry, user does not exist"
        }, {
            status: 401
        })
    }
}