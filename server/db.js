import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB || "pertok";
const collectionName = process.env.MONGODB_COLLECTION || "org_data";

if (!uri) {
  throw new Error("Missing MONGODB_URI in .env");
}

let clientPromise;

async function getClient() {
  if (!clientPromise) {
    const client = new MongoClient(uri);
    clientPromise = client.connect();
  }

  return clientPromise;
}

export async function getCollection() {
  const client = await getClient();
  return client.db(databaseName).collection(collectionName);
}
