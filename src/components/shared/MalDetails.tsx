import { memo } from 'react';
import { Description } from '~/types';

interface MalDetailsProps {
    desc: Description;
}

function MalDetails({ desc }: MalDetailsProps) {
    return (
        <div className="animate__fadeIn animate__animated grid h-fit w-full grid-cols-1 text-white md:grid-cols-2 md:space-x-2 lg:space-x-4">
            <div className="w-full">
                {/* title  */}
                <div className="my-4 flex w-full flex-col space-y-2 md:space-y-4">
                    <h1 className="font-secondary text-3xl md:text-4xl">
                        Tên truyện:
                    </h1>
                    <h2 className="text-xl md:text-2xl">
                        <span className="uppercase text-[#fb923c]">
                            Tên khác:
                        </span>{' '}
                        {desc.titles?.title_synonyms || ''}
                    </h2>
                    <h2 className="text-xl md:text-2xl">
                        <span className="uppercase text-[#22d3ee]">
                            Japanese:
                        </span>{' '}
                        {desc.titles?.title_japanese || ''}
                    </h2>
                    <h2 className="text-xl md:text-2xl">
                        <span className="uppercase text-[#f472b6]">
                            English:
                        </span>{' '}
                        {desc.titles?.title_english || ''}
                    </h2>
                </div>
                {/* desc  */}
                <div className="my-4 flex w-full flex-col space-y-2 md:space-y-4">
                    <h1 className="font-secondary text-3xl md:text-4xl">
                        Mô tả (MAL):
                    </h1>

                    <h2 className="text-xl leading-loose tracking-wider md:text-2xl">
                        {desc?.description || ''}
                    </h2>
                </div>
            </div>

            <div className="w-full">
                <div className="my-4 flex w-full flex-col space-y-2 md:space-y-4">
                    {/* ranked  */}
                    <h1 className="font-secondary text-3xl md:text-4xl">
                        Xếp hạng (MAL):
                    </h1>
                    <h2 className="font-secondary text-2xl text-primary md:text-3xl">
                        {desc?.ranked || ''}
                    </h2>
                    {/* popularity  */}
                    <h1 className="font-secondary text-3xl md:text-4xl">
                        Phổ biến (MAL):
                    </h1>
                    <h2 className="font-secondary text-2xl text-[#facc15] md:text-3xl">
                        {desc?.popularity || ''}
                    </h2>
                    {/* score  */}
                    <h1 className="font-secondary text-3xl md:text-4xl">
                        Điểm (MAL):
                    </h1>
                    <h2 className="font-secondary text-2xl text-[#818cf8] md:text-3xl">
                        {desc?.score || ''}
                    </h2>
                    <h1 className="font-secondary text-3xl md:text-4xl">
                        Ngày phát hành:
                    </h1>
                    <h2 className="font-secondary text-2xl text-[#e879f9] md:text-3xl">
                        {desc?.published || ''}
                    </h2>
                </div>
            </div>
        </div>
    );
}
export default memo(MalDetails);
