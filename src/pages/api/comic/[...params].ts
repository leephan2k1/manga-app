import type { NextApiRequest, NextApiResponse } from 'next';
import { SOURCE_COLLECTIONS } from '~/constants';
import NtModel from '~/serverless/models/Nt.model';
import LhModel from '~/serverless/models/Lh.model';

const comic = async (req: NextApiRequest, res: NextApiResponse) => {
    const { params, limit } = req.query;

    const source = params[0];
    const slug = params[1];

    let model;

    switch (source) {
        case 'nt':
            model = NtModel.getInstance(SOURCE_COLLECTIONS[source]);
            break;
        case 'lh':
            model = LhModel.getInstance(SOURCE_COLLECTIONS[source]);
            break;
        default:
            return res.status(401).json({ success: false });
    }

    const comic = await model.getComic(slug, +limit);

    res.status(200).json({
        success: true,
        data: comic,
    });
};

export default comic;
