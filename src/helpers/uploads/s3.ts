// Bun s3 client
import { S3Client } from "bun";

const s3Client = new S3Client({
    accessKeyId: Bun.env.SEVALLA_ACCESS_KEY_ID,
    secretAccessKey: Bun.env.SEVALLA_SECRET_ACCESS_KEY,
    bucket: Bun.env.SEVALLA_BUCKET,
    endpoint: Bun.env.SEVALLA_ENDPOINT,
    region: Bun.env.SEVALLA_REGION
});

export default s3Client;