import mongoose from 'mongoose';
import { mongoDbRemoteClient } from '../utils/mongoose';
const { Schema } = mongoose;

const PageSchema = new Schema(
    {
        chapterSlug: {
            type: String,
            unique: true,
            require: true,
            index: true,
        },
        chapter: {
            type: Schema.Types.ObjectId,
            ref: 'chapters',
        },
        pages: [
            {
                id: {
                    type: String,
                    require: true,
                },
                src: {
                    type: String,
                    require: true,
                },
                fallbackSrc: {
                    type: String,
                },
            },
        ],
        comicSlug: {
            type: String,
            require: true,
        },
        comicName: {
            type: String,
            require: true,
        },
        source: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoDbRemoteClient.model('pages', PageSchema);
