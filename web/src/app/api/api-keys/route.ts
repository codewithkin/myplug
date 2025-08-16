import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET (req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const apiKey = searchParams.get("apiKey");

        if (!apiKey) {
            return NextResponse.json({ error: "API key is required" }, { status: 400, headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            }, });
        }
        
        // Check if the apiKey is correct
        const result = await auth.api.verifyApiKey({
            body: {
              key: apiKey
            },
        });

        console.log("Result: ", result);

        if (!result.valid) {
            return NextResponse.json({ error: "Invalid API key" }, { status: 401, headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            }, });
        }

        return NextResponse.json({ message: "API key is valid" }, { status: 200, headers: {
            "Access-Control-Allow-Origin": "*",
        } });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500, headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
        }, });
    }
}