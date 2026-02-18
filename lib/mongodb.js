import { MongoClient } from 'mongodb'

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo

if (!cached) {
  cached = global.mongo = { conn: null, promise: null }
}

async function dbConnect() {
  const uri = process.env.MONGODB_URI
  
  if (!uri) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    )
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      maxPoolSize: 10,
    }

    cached.promise = MongoClient.connect(uri, opts).then((client) => {
      return client
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
