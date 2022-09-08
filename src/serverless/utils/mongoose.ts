import mongoose from 'mongoose';

const uri = process.env.MONGODB_DATA_URI as string;
const dbName = process.env.MONGODB_DATA_DB as string;

export const mongoDbRemoteClient = mongoose.createConnection(uri, {
    dbName: dbName,
});

import('../models/Chapter.model');
import('../models/Comic.model');
import('../models/Page.model');
import('../models/Description.model');
