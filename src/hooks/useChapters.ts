import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { MANGA_PATH_NAME, MANGA_PATH_READ_NAME } from '~/constants';
import { axiosClientV2 } from '~/services/axiosClient';
import NProgress from 'nprogress';

export default function useChapters() {
    const router = useRouter();
    const { data: session, status } = useSession();

    const goToFirstChapter = async (mangaSlug: string) => {
        try {
            NProgress.start();

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
            NProgress.done();
        }
    };

    const saveCurrentChapter = async (
        source: string,
        comicSlug: string,
        chapterSlug: string,
        chapterNumber: string,
    ) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if (status === 'unauthenticated' || !session?.user?.id) return false;

        try {
            const res = await (
                await axios.post(`/api/history`, {
                    source,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    userId: session?.user?.id as string,
                    comicSlug,
                    chapterSlug,
                    chapterNumber,
                })
            ).data;

            return res.success;
        } catch (error) {
            return false;
        }
    };

    const getUserHistory = async () => {
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            if (status === 'unauthenticated' || !session?.user?.id)
                return false;

            const res = await axios.get(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                `/api/history?userId=${session?.user?.id}`,
            );

            if (res.data) return res.data?.user;
        } catch (error) {
            return false;
        }
    };

    return { goToFirstChapter, saveCurrentChapter, getUserHistory };
}
