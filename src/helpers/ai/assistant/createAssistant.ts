import { string } from "better-auth";

export type AssistantProps = {
    assistantName: string,
    purpose: string
}

export default async function createAssistant (obj: AssistantProps) {
    try {

    } catch (e) {
        console.log("An error occured while creating assistant: ", e);
    }
}