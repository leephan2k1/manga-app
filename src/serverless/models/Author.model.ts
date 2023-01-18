import mongoose from 'mongoose';

import { mongoDbRemoteClient } from '../utils/mongoose';

const { Schema } = mongoose;

export const authorSchema = {
    name: { type: String, index: true, unique: true, trim: true },
    description: { type: String, trim: true },
    avatar: { type: String, trim: true },
    jp_name: { type: String, trim: true },
    jp_alternative_name: { type: String, trim: true },
    birthday: { type: String, trim: true },
    sc_twitter_link: { type: String, trim: true },
    sc_instagram_link: { type: String, trim: true },
    sc_pixiv_link: { type: String, trim: true },
    followers: [{ type: Schema.Types.ObjectId }],
};

const AuthorSchema = new Schema(authorSchema);

export default mongoDbRemoteClient.model('authors', AuthorSchema);
