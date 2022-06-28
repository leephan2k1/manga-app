import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '~/serverless/utils/connectdb';

const follow = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body, query } = req;
    const { slug, userId } = query;
    const { db } = await connectToDatabase();

    switch (method) {
        case 'POST':
            try {
                await db.collection('watchlists').updateOne(
                    { userId: body.userId, mangaSlug: slug },
                    {
                        $set: {
                            ...body,
                            mangaSlug: slug,
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            //@ts-ignore
                            createAt: new Date(Date.now()),
                        },
                    },
                    { upsert: true },
                );

                res.status(201).json({
                    success: true,
                });
            } catch (err) {
                res.status(500).json(err);
            }
            break;

        case 'GET':
            try {
                const data = await db
                    .collection('watchlists')
                    .findOne({ userId, mangaSlug: slug });

                if (!data)
                    return res.status(404).json({ message: 'items not found' });

                return res.status(200).json({
                    success: true,
                    data,
                });
            } catch (err) {
                res.status(500).json(err);
            }
            break;

        case 'DELETE':
            try {
                await db
                    .collection('watchlists')
                    .deleteOne({ userId, mangaSlug: slug });

                res.status(200).json({
                    success: true,
                });
            } catch (err) {
                res.status(500).json(err);
            }
            break;

        default:
            res.status(500).json({
                message: 'Method not matches',
            });
    }
};

export default follow;
