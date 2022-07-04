import axios from 'axios';
import { FollowState, MangaDetails } from '~/types';

export default function useFollow() {
    const add = async (
        userId: string,
        mangaSlug: string,
        source: string,
        status: FollowState,
        manga: MangaDetails,
    ) => {
        try {
            await axios.post(`/api/follow/${mangaSlug}`, {
                userId,
                source,
                status,
                details: {
                    thumbnail: manga.thumbnail,
                    name: manga.title,
                    newChapter: manga.chapterList[0].chapterTitle,
                    genres: manga.genres.map((genre) => genre.genreTitle),
                    status: manga.status,
                    author: manga.author,
                    otherName: manga.otherName,
                    review: manga.review,
                    updatedAt: manga.updatedAt,
                    slug: mangaSlug,
                },
            });

            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const get = async (userId: string, mangaTitle: string) => {
        try {
            const response = await axios.get(
                `/api/follow/${mangaTitle}?userId=${userId}`,
            );
            return response.data;
        } catch (err) {
            console.error(err);
        }
    };

    const _delete = async (userId: string, mangaSlug: string) => {
        try {
            await axios.delete(`/api/follow/${mangaSlug}?userId=${userId}`);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    return { add, get, _delete };
}
