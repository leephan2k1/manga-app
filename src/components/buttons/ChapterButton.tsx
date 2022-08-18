import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { ReactNode } from 'react';
import toast from 'react-hot-toast';
import { axiosClientV2 } from '~/services/axiosClient';

interface ChapterButtonProps {
    children: ReactNode;
    style?: string;
    path: string;
    payload: {
        chapterSlug: string;
        source: string;
        comicName: string;
        comicSlug: string;
    };
}

export default function ChapterButton({
    children,
    style,
    path,
    payload,
}: ChapterButtonProps) {
    const router = useRouter();

    const handleGoToRead = async () => {
        try {
            NProgress.start();

            await axiosClientV2.post('/chapters', payload);

            router.push(path);
        } catch (err) {
            toast.error('Oops! Lỗi rồi, hãy thử lại chapter của nguồn khác!', {
                duration: 3000,
                style: { zIndex: 899 },
            });

            NProgress.done();
        }
    };

    return (
        <button onClick={handleGoToRead} className={style}>
            {children}
        </button>
    );
}
