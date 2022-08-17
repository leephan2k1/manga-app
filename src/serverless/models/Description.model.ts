import mongoose from 'mongoose';
import { mongoDbRemoteClient } from '../utils/mongoose';
const { Schema } = mongoose;

const Description = new Schema({
    mal_id: { type: Number, require: true },
    name: { type: String, require: true, index: true },
    slug: { type: String, require: true, index: true },
    createdAt: { type: Date },
    cover: { type: String, require: true },
    score: { type: String },
    titles: {
        title_synonyms: { type: String },
        title_japanese: { type: String },
        title_english: { type: String },
    },
    description: { type: String },
    published: { type: String },
    ranked: { type: String },
    popularity: { type: String },
    characters: [
        {
            cover: { type: String },
            mal_url: { type: String },
            name: { type: String },
            role: { type: String },
        },
    ],
    recommendations: [
        {
            title: { type: String },
            cover: { type: String },
            coverFallback: { type: String },
            url: { type: String },
        },
    ],
    pictures: [
        {
            large: { type: String },
            small: { type: String },
        },
    ],
});

export default mongoDbRemoteClient.model('descriptions', Description);
