import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { MANGA_PATH_FOLLOW } from '~/constants';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname === `/${MANGA_PATH_FOLLOW}`) {
        const session = await getToken({
            req,
            secret: process.env.JWT_SECRET,
            secureCookie: process.env.NODE_ENV === 'production',
        });
        // You could also check for any property on the session object,
        // like role === "admin" or name === "John Doe", etc.

        //fix ref: https://nextjs.org/docs/messages/middleware-relative-urls
        const url = req.nextUrl.clone();
        url.pathname = '/login';

        if (!session) return NextResponse.redirect(url);
        // If user is authenticated, continue.
    }
}
