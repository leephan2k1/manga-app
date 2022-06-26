// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient, MongoClientOptions } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).

    //fix type in ts ref: https://github.com/prisma/prisma/discussions/10037
    const globalWithMongoDB = global as typeof globalThis & {
        _mongoClientPromise: Promise<MongoClient>;
    };

    if (!globalWithMongoDB._mongoClientPromise) {
        client = new MongoClient(uri, options as MongoClientOptions);
        globalWithMongoDB._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongoDB._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options as MongoClientOptions);
    clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
