import type { NextApiRequest, NextApiResponse } from 'next';
import { SOURCE_COLLECTIONS } from '~/constants';
import LhModel from '~/serverless/models/Lh.model';

const search = async (req: NextApiRequest, res: NextApiResponse) => {
    const { params } = req.query;
    const { title } = req.query;

    const source = params[0];

    let model;

    switch (source) {
        case 'lh':
            model = LhModel.getInstance(SOURCE_COLLECTIONS[source]);
            break;
        default:
            return res.status(401).json({ success: false });
    }

    const comic = await model.search(title as string);

    if (!comic?.data?.length) return res.status(404).json({ message: 'error' });

    res.status(200).json({
        success: true,
        data: comic,
    });
};

export default search;
