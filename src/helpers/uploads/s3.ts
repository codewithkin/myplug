// Bun s3 client
import { S3Client } from "bun";

const s3Client = new S3Client({
    accessKeyId: process.env.SEVALLA_ACCESS_KEY_ID,
    secretAccessKey: process.env.SEVALLA_SECRET_ACCESS_KEY,
    bucket: process.env.SEVALLA_BUCKET,
    endpoint: process.env.SEVALLA_ENDPOINT,
    region: process.env.SEVALLA_REGION
});

export default s3Client;