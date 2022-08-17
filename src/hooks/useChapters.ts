import { useRouter } from 'next/router';
import { MANGA_PATH_NAME, MANGA_PATH_READ_NAME } from '~/constants';
import { axiosClientV2 } from '~/services/axiosClient';

export default function useChapters() {
    const router = useRouter();

    const goToFirstChapter = async (mangaSlug: string) => {
        try {
            const res = await (
                await axiosClientV2.get(`/comics/${mangaSlug}/chapters`, {
                    params: {
                        options: 'get',
                    },
                })
            ).data;

            if (res?.chapters.chapters_list?.length) {
                const { chapters } = res?.chapters.chapters_list[0];

                if (!chapters[chapters.length - 1]) return;

                await axiosClientV2.post('/chapters', {
                    chapterSlug: chapters[chapters.length - 1].chapterSlug,
                    source: 'NTC',
                    comicName: res?.chapters.comicName,
                    comicSlug: res?.chapters.comicSlug,
                });

                router.push(
                    `/${MANGA_PATH_NAME}/${MANGA_PATH_READ_NAME}/NTC/${
                        chapters[chapters.length - 1].chapterNumber
                    }/${chapters[chapters.length - 1].chapterSlug}`,
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    return { goToFirstChapter };
}
