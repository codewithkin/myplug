import { Message } from "@/generated/prisma";
import openaiClient from ".";

export default async function generateAiResponse(message: string, messages: Message[] | any) {
    try {
        const response = await openaiClient.chat.completions.create({
            model: "deepseek-ai/DeepSeek-R1-fast",
            messages
        })

        // For DeepSeek models, the response will have a thought process inside <think></think> tags, so for now let's remove the thought process and only return what is after them (that is, the actual response)
        const responseText = response.choices[0].message.content as string;

        // Remove the <think></think> tags and everything before it
        const startIndex = responseText.indexOf("</think>");

        if(startIndex !== -1) {
            return responseText.substring(startIndex + 8);
        }

        return responseText;
    } catch (e) {
        console.log("An error occured while generating AI response: ", e);
    }
}