import axios from 'axios';
import { useRouter } from 'next/router';
import { MANGA_PATH_NAME, MANGA_PATH_READ_NAME } from '~/constants';

export default function useChapters() {
    const router = useRouter();

    const goToFirstChapter = async (mangaSlug: string) => {
        try {
            const res = await (
                await axios.get(`/api/comic/nt/${mangaSlug}?limit=1`)
            ).data;

            if (res.success) {
                const { chapterNumber } = res.data.chapterList[0];
                const { chapterId } = res.data.chapterList[0];

                router.push(
                    `/${MANGA_PATH_NAME}/${MANGA_PATH_READ_NAME}/${mangaSlug}/${chapterNumber}/${chapterId}`,
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    return { goToFirstChapter };
}
