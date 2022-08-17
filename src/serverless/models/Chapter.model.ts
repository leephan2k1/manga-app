import mongoose from 'mongoose';
import { mongoDbRemoteClient } from '../utils/mongoose';
const { Schema } = mongoose;

const ChapterSchema = new Schema({
    comicName: { type: String, index: true },
    comicSlug: { type: String, index: true, require: true },
    source: { type: String },
    createdAt: { type: Date, default: Date.now },
    chapters_list: [
        {
            sourceName: { type: String },
            chapters: [
                {
                    chapterId: { type: String },
                    chapterSlug: { type: String },
                    chapterNumber: { type: String },
                    chapterTitle: { type: String },
                    updatedAt: { type: String },
                    view: { type: String },
                },
            ],
        },
    ],
});

export default mongoDbRemoteClient.model('chapters', ChapterSchema);
