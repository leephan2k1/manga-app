import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '~/serverless/utils/connectdbData';

const history = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body, query } = req;
    const { db } = await connectToDatabase();

    switch (method) {
        case 'POST':
            try {
                const {
                    userId,
                    source,
                    comicSlug,
                    chapterSlug,
                    chapterNumber,
                } = body;

                const user = await db.collection('history').findOne({ userId });

                if (user) {
                    const { save_list } = user;

                    if (save_list) {
                        const currentChapterIdx = save_list.findIndex(
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            //@ts-ignore
                            (e) => e.comicSlug === comicSlug,
                        );

                        if (
                            currentChapterIdx < save_list.length &&
                            save_list[currentChapterIdx]
                        ) {
                            Object.assign(save_list[currentChapterIdx], {
                                ...save_list[currentChapterIdx],
                                source,
                                chapterSlug,
                                chapterNumber,
                            });
                        } else {
                            save_list.push({
                                source,
                                comicSlug,
                                chapterSlug,
                                chapterNumber,
                            });
                        }

                        await db
                            .collection('history')
                            .updateOne(
                                { userId },
                                { $set: { save_list } },
                                { upsert: true },
                            );

                        return res.status(200).json({
                            success: true,
                        });
                    }
                }

                await db.collection('history').updateOne(
                    { userId },
                    {
                        $set: {
                            userId,
                            save_list: [
                                {
                                    source,
                                    comicSlug,
                                    chapterSlug,
                                    chapterNumber,
                                },
                            ],
                        },
                    },
                    { upsert: true },
                );

                return res.status(201).json({
                    success: true,
                });
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: error,
                });
            }
        case 'GET':
            try {
                const { userId } = query;

                if (userId) {
                    const user = await db
                        .collection('history')
                        .findOne({ userId });

                    if (user)
                        return res.status(200).json({
                            success: true,
                            user,
                        });
                }

                return res.status(400).json({
                    success: false,
                });
            } catch (error) {
                return res.status(400).json({
                    success: false,
                });
            }
    }
};

export default history;
