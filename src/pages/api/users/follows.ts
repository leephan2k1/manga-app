import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '~/serverless/utils/connectdb';

const follows = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query } = req;
    const { userid } = req.headers;
    const { db } = await connectToDatabase();

    switch (method) {
        case 'GET':
            const { status } = query;

            const data = await db
                .collection('watchlists')
                .find({ userId: userid, status })
                .toArray();

            if (!data)
                return res.status(404).json({ message: 'items not found' });

            res.status(200).json({
                success: true,
                data,
            });
            break;
    }
};

export default follows;
