require('dotenv').config()

const { MongoClient } = require('mongodb')
let singleton

async function connect() {
    if (singleton) return singleton

    const client = new MongoClient(process.env.MONGO_HOST)
    await client.connect()

    singleton = client.db(process.env.MONGO_DATABASE)
    return singleton
}

async function register(pet) {
    const db = await connect()
    return db.collection('pets').insertOne(pet)
}

async function listAll() {
    const db = await connect()
    return db.collection('pets').find().toArray()
}

module.exports = {
    register,
    listAll
}