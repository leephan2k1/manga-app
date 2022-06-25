import Image from 'next/image';
import Link from 'next/link';
import Zoro from 'public/images/zoro.png';
import { ReactNode, useRef } from 'react';
import { useHover } from 'usehooks-ts';
import Head from '~/components/shared/Head';
import Section from '~/components/shared/Section';

function NotFoundPage() {
    const hoverRef = useRef(null);
    const isHover = useHover(hoverRef);

    return (
        <div className="min-h-screen  w-full bg-background text-white">
            <Head title={'Opps! Lỗi rồi...'} />

            <div className="mx-auto flex h-full min-h-screen max-w-[1200px] flex-col  items-center justify-center">
                <Section style="h-fit w-full space-y-4">
                    <h1 className="px-6 text-center font-secondary text-4xl md:text-6xl lg:px-0">
                        Oops! Chào user-kun, có vẻ bạn đã đi lạc vào vùng đất
                        <span className="text-primary"> 404</span>
                    </h1>
                    <h2 className="px-6 text-center font-secondary text-3xl md:text-5xl lg:px-0">
                        Đừng lo! Hãy để Zoro dẫn bạn quay lại vùng đất cũ.
                    </h2>
                </Section>

                <div className="flex h-[500px] min-h-[400px] w-full flex-col items-center justify-center gap-4">
                    <h3
                        key={String(isHover)}
                        className="animate__fadeInUp animate__animated animate__faster text-2xl"
                    >
                        {isHover ? 'Trust me...' : 'Follow me!'}
                    </h3>

                    <figure className="relative h-[60%] w-[250px]">
                        <Image
                            className="absolute rounded-2xl object-cover object-center"
                            layout="fill"
                            alt="zoro-img"
                            src={Zoro}
                        />
                    </figure>

                    <button
                        ref={hoverRef}
                        className="mt-4 rounded-xl border-2 border-white p-6 transition-all hover:border-none hover:bg-primary hover:text-white"
                    >
                        <Link href="/">
                            <a> Theo Zoro về vùng đất Kyoto Manga</a>
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

NotFoundPage.getLayout = (page: ReactNode) => page;

export default NotFoundPage;
