import { Client } from "basic-ftp";
import { Readable } from "stream";

export async function upload(fileStream: Readable) {
  const client = new Client();

  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASS,
    });

    await client.uploadFrom(fileStream, process.env.FTP_FILE!);
  } finally {
    client.close();
  }
}
