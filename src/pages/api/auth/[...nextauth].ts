import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import clientPromise from '~/serverless/libs/mongodb';

import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        }),
    ],
    secret: process.env.JWT_SECRET,
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async session({ session, token }) {
            session = {
                ...session,
                user: {
                    ...session.user,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    id: token?.sub,
                },
            };
            return session;
        },
    },
    adapter: MongoDBAdapter(clientPromise),
});
