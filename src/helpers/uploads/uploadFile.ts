import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "./s3";

export default async function uploadFile(file: File) {
    try {
        const dataFileUrl = await s3Client.send(new PutObjectCommand({
            Bucket: process.env.SEVALLA_BUCKET,
            Key: `chatbots/${file.name}`,
            Body: file
        }));
    
        return dataFileUrl.toString();
    } catch (e) {
        console.log("An error occured while uplaoding file: ", e);
        throw new Error("An error occured while uplaoding file");
    }
}