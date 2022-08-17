import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { axiosClientV2 } from '~/services/axiosClient';
import toast from 'react-hot-toast';

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
            await axiosClientV2.post('/chapters', payload);

            router.push(path);
        } catch (err) {
            console.log('error fetch pages by chapter!!');
            toast.error('Oops! Lỗi rồi, hãy thử lại chapter của nguồn khác!', {
                duration: 3000,
                style: { zIndex: 899 },
            });
        }
    };

    return (
        <button onClick={handleGoToRead} className={style}>
            {children}
        </button>
    );
}
