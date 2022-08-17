import { Comic } from '~/types';

export default function webtoonChecker(manga: Comic) {
    if (Array.isArray(manga.genres))
        return manga?.genres?.some(
            (genre) =>
                !!['manhua', 'manhwa', 'webtoon'].find(
                    (i) => i === genre.label.trim().toLocaleLowerCase(),
                ),
        );
}
