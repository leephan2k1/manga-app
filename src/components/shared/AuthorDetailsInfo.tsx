import { memo } from 'react';
import { BsInstagram, BsTwitter } from 'react-icons/bs';
import { SiPixiv } from 'react-icons/si';
import { Author, Manga } from '~/types';
import ListView from './ListView';

interface AuthorDetailsInfoProps {
    author: Author;
    comics: Manga[];
}

function AuthorDetailsInfo({ author, comics }: AuthorDetailsInfoProps) {
    return (
        <div className="flex flex-col space-y-6">
            {author?.jp_name && (
                <>
                    <h2 className="select-none font-secondary text-3xl">
                        Nhật ngữ:
                    </h2>
                    <p className="text-xl">{author?.jp_name}</p>
                </>
            )}

            {author?.jp_alternative_name && (
                <>
                    <h2 className="select-none font-secondary text-3xl">
                        Tên khác:
                    </h2>
                    <p className="text-xl">{author?.jp_alternative_name}</p>
                </>
            )}

            <h2 className="select-none font-secondary text-3xl">Ngày sinh:</h2>
            <p className="text-xl">
                {author?.birthday === '' || author?.birthday === 'Unknown'
                    ? 'Chưa rõ'
                    : author?.birthday}
            </p>

            {author?.description && (
                <>
                    <h2 className="select-none font-secondary text-3xl">
                        Tiểu sử:
                    </h2>
                    <p className="text-xl md:max-w-[80%]">
                        {author?.description}
                    </p>
                </>
            )}

            {(author?.sc_instagram_link ||
                author?.sc_pixiv_link ||
                author?.sc_twitter_link) && (
                <h2 className="select-none font-secondary text-3xl">
                    Hoạt động:
                </h2>
            )}

            <div className="flex w-full flex-wrap gap-x-6 gap-y-4">
                {author?.sc_twitter_link && (
                    <button className="smooth-effect rounded-lg bg-highlight py-3 px-6 hover:bg-highlight/70">
                        <a
                            rel="noreferrer"
                            target="_blank"
                            className="flex items-center  space-x-2"
                            href={author?.sc_twitter_link}
                        >
                            <BsTwitter className="h-10 w-10 text-blue-500" />
                            <span>Twitter</span>
                        </a>
                    </button>
                )}

                {author?.sc_instagram_link && (
                    <button className="smooth-effect flex items-center rounded-lg bg-highlight py-3 px-6 hover:bg-highlight/70">
                        <a
                            rel="noreferrer"
                            target="_blank"
                            className="flex items-center space-x-2"
                            href={author?.sc_instagram_link}
                        >
                            <BsInstagram className="h-10 w-10 text-rose-500" />
                            <span>Instagram</span>
                        </a>
                    </button>
                )}

                {author?.sc_pixiv_link && (
                    <button className="smooth-effect flex items-center rounded-lg bg-highlight py-3 px-6 hover:bg-highlight/70">
                        <a
                            rel="noreferrer"
                            target="_blank"
                            className="flex items-center space-x-2"
                            href={author?.sc_pixiv_link}
                        >
                            <SiPixiv className="h-10 w-10    text-sky-500" />
                            <span>Pixiv</span>
                        </a>
                    </button>
                )}
            </div>

            <h2 className="select-none font-secondary text-3xl">Tác phẩm:</h2>
            <div className="h-fit w-full px-2">
                <ListView
                    comicList={comics}
                    isLoading={!comics || comics.length === 0}
                    numberSkeleton={5}
                />
            </div>
        </div>
    );
}

export default memo(AuthorDetailsInfo);
