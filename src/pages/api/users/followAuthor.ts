import type { NextApiRequest, NextApiResponse } from 'next';
import AuthorModel from '~/serverless/models/Author.model';

const followAuthor = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body, query } = req;
    const { authorName, userId } = body;

    try {
        switch (method) {
            case 'POST':
                if (!body?.authorName || !body?.userId) {
                    return res.status(400).send({
                        success: false,
                        message: 'authorName or userId field is missing',
                    });
                }

                const state = await AuthorModel.updateOne(
                    { name: authorName },
                    { $addToSet: { followers: userId } },
                    { upsert: true },
                );

                if (state)
                    return res.status(201).send({
                        success: true,
                    });
                break;

            case 'DELETE':
                if (!body?.authorName || !body?.userId) {
                    return res.status(400).send({
                        success: false,
                        message: 'authorName or userId field is missing',
                    });
                }

                const deleteState = await AuthorModel.updateOne(
                    { name: authorName },
                    { $pull: { followers: userId } },
                    { upsert: true },
                );

                if (deleteState)
                    return res.status(201).send({
                        success: true,
                    });

                break;

            case 'GET':
                const authors = await AuthorModel.find({
                    followers: { $in: [query.userId] },
                });

                return res.status(200).send({ authors });
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
        });
    }
};

export default followAuthor;
