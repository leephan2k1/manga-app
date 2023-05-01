import type { NextApiRequest, NextApiResponse } from 'next';
import { redis } from '~/services/redisClient';
import Page from '~/serverless/models/Page.model';
import Chapter from '~/serverless/models/Chapter.model';

export const pagesCachingHandler = async (comicSlug: string) => {
    const pages = await Page.find({ comicSlug }).populate('chapter');

    let chapter = pages[0]?.chapter;

    if (!chapter && comicSlug) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        chapter = await Chapter.findOne({
            comicName: pages[0].comicName,
        });

        chapter &&
            (await Page.updateMany({ comicSlug }, { chapter: chapter._id }));
    }

    if (pages && pages.length > 0) {
        await Promise.allSettled(
            pages.map(async (e) => {
                return await redis.set(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    e.chapterSlug,
                    JSON.stringify({ ...e, chapter }),
                    'EX',
                    '900',
                ); // expired in 900s = 15m
            }),
        );
    }
};

const pagesComicCaching = async (req: NextApiRequest, res: NextApiResponse) => {
    const { comicSlug } = req.query;

    await pagesCachingHandler(String(comicSlug));

    return res.status(200).json({
        success: true,
    });
};

export default pagesComicCaching;
