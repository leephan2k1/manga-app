import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const proxy = async (req: NextApiRequest, res: NextApiResponse) => {
    const { src, url } = req.query;

    const options = {
        responseType: 'stream',
        headers: {
            referer: String(url),
        },
    } as const;

    const response = await axios.get(String(src), options);

    response.data.pipe(res);
};

export default proxy;
