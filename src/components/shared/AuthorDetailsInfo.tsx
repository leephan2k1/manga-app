import { memo } from 'react';
import { BsInstagram, BsTwitter } from 'react-icons/bs';
import { SiPixiv } from 'react-icons/si';
import ListView from './ListView';

function AuthorDetailsInfo() {
    return (
        <div className="flex flex-col space-y-6">
            <h2 className="select-none font-secondary text-3xl">Nhật ngữ:</h2>
            <p className="text-xl">サカ</p>

            <h2 className="select-none font-secondary text-3xl">Tên khác:</h2>
            <p className="text-xl">石</p>

            <h2 className="select-none font-secondary text-3xl">Ngày sinh:</h2>
            <p className="text-xl">Chưa rõ</p>

            <h2 className="select-none font-secondary text-3xl">Tiểu sử:</h2>
            <p className="text-xl md:max-w-[80%]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum aperiam odit nobis rerum consequatur sequi sint
                veniam in vero molestiae! Enim cumque possimus assumenda
                voluptate dignissimos nihil rem est quod.
            </p>

            <h2 className="select-none font-secondary text-3xl">Hoạt động:</h2>
            <div className="flex w-full flex-wrap gap-x-6 gap-y-4">
                <button className="smooth-effect flex items-center space-x-2 rounded-lg bg-highlight py-3 px-6 hover:bg-highlight/70">
                    <BsTwitter className="h-10 w-10 text-blue-500" />
                    <span>Twitter</span>
                </button>
                <button className="smooth-effect flex items-center space-x-2 rounded-lg bg-highlight py-3 px-6 hover:bg-highlight/70">
                    <BsInstagram className="h-10 w-10 text-rose-500" />
                    <span>Instagram</span>
                </button>
                <button className="smooth-effect flex items-center space-x-2 rounded-lg bg-highlight py-3 px-6 hover:bg-highlight/70">
                    <SiPixiv className="h-10 w-10    text-sky-500" />
                    <span>Pixiv</span>
                </button>
            </div>

            <h2 className="select-none font-secondary text-3xl">Tác phẩm:</h2>
            <div className="h-fit w-full px-2">
                <ListView comicList={[]} isLoading numberSkeleton={5} />
            </div>
        </div>
    );
}

export default memo(AuthorDetailsInfo);
