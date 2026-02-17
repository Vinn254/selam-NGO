import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI || 'mongodb+srv://shamironsshakes_db_user:vin@2020@cluster0.r3uf8wj.mongodb.net/?appName=Cluster0'

if (!uri) {
  console.warn('MONGODB_URI not set. MongoDB operations will fail until configured.')
}

let client
let clientPromise

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, { maxPoolSize: 10 })
  global._mongoClientPromise = client.connect()
}

clientPromise = global._mongoClientPromise

export default clientPromise
