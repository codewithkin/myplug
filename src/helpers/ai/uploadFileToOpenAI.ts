import fs from "fs";
import openaiClient from ".";

export async function uploadFileToOpenAI(filePath: string) {
    console.log("Uploading file to OpenAI: ", filePath);

    const uploadedFile = await openaiClient.files.create({
        file: fs.createReadStream(filePath),
        purpose: "user_data",
    });

  return uploadedFile.id;
}