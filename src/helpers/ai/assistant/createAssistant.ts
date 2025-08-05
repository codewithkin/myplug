import openaiClient from "..";

export type AssistantProps = {
    assistantName: string,
    purpose: string
}

export default async function createAssistant (obj: AssistantProps) {
    try {
        // Create an openai assistant
        const assistant = await openaiClient.beta.assistants.create({
            name: obj.assistantName,
            instructions: obj.purpose,
            model: "deepseek-ai/DeepSeek-R1"
        })

        return assistant.id;
    } catch (e) {
        console.log("An error occured while creating assistant: ", e);
    }
}