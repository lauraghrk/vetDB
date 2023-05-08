require('dotenv').config()

const { MongoClient, ObjectId } = require('mongodb')
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

async function remove(id) {
    const db = await connect()
    return db.collection('pets').deleteOne({_id: new ObjectId(id)})
}

module.exports = {
    register,
    listAll,
    remove
}