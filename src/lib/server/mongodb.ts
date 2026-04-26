import { MongoClient, type Db } from 'mongodb'

const uri = process.env.MONGO_URL

if (!uri) {
  throw new Error('MONGO_URL is not set in environment variables')
}
const mongoUri = uri

const globalForMongo = globalThis as typeof globalThis & {
  __mongoClientPromise?: Promise<MongoClient>
}

function createClientPromise() {
  const client = new MongoClient(mongoUri)
  return client.connect()
}

const clientPromise =
  globalForMongo.__mongoClientPromise ?? createClientPromise()

if (process.env.NODE_ENV !== 'production') {
  globalForMongo.__mongoClientPromise = clientPromise
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise
  return client.db()
}
