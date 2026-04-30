import { MongoClient } from "mongodb";

let clientPromise;

async function getClient(uri) {
  if (!clientPromise) {
    const client = new MongoClient(uri);
    clientPromise = client.connect();
  }

  return clientPromise;
}

export async function getCollection() {
  const uri = process.env.MONGODB_URI;
  const databaseName = process.env.MONGODB_DB;
  const collectionName = process.env.MONGODB_COLLECTION;

  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable. Please set it in Netlify settings.");
  }
  if (!databaseName) {
    throw new Error("Missing MONGODB_DB environment variable. Please set it in Netlify settings.");
  }
  if (!collectionName) {
    throw new Error("Missing MONGODB_COLLECTION environment variable. Please set it in Netlify settings.");
  }

  const client = await getClient(uri);
  return client.db(databaseName).collection(collectionName);
}
