import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from '~/serverless/libs/mongodb';

import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    secret: process.env.JWT_SECRET,
    session: {
        strategy: 'jwt',
    },
    adapter: MongoDBAdapter(clientPromise),
});
