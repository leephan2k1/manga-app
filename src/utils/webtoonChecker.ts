import { MangaDetails } from '~/types';

export default function webtoonChecker(manga: MangaDetails) {
    if (Array.isArray(manga.genres))
        return manga?.genres?.some(
            (genre) =>
                !!['manhua', 'manhwa', 'webtoon'].find(
                    (i) => i === genre.genreTitle.trim().toLocaleLowerCase(),
                ),
        );
}
