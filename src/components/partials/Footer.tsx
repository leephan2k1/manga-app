import TextLogo from '../icons/TextLogo';
import LogoSVG from '/public/images/torii-gate-japan.svg';
import Link from 'next/link';

import { useMediaQuery } from 'usehooks-ts';

export default function Footer() {
    const matchesMobile = useMediaQuery('(max-width: 643px)');

    return (
        <footer className="my-6 bg-background pb-6 text-white">
            <figure className="relative flex min-h-[150px] w-full items-center justify-center">
                <TextLogo className="z-10 h-[40px] w-[130px] fill-white md:h-[50px] md:w-[200px]" />
                <LogoSVG
                    className="absolute z-0"
                    width={matchesMobile ? 90 : 120}
                    height={matchesMobile ? 90 : 120}
                />
            </figure>

            <div className="mx-auto flex w-[70%] flex-col justify-center space-y-4 text-lg md:text-2xl">
                <h1 className="text-center text-2xl font-bold md:text-4xl">
                    Kyoto Manga là website đọc truyện tranh miễn phí
                </h1>
                <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:space-x-8 md:text-2xl">
                    <Link href="/terms-of-service">
                        <a className="hover:text-primary">Điều khoản dịch vụ</a>
                    </Link>
                    <Link href="/privacy-policy">
                        <a className="hover:text-primary">
                            Chính sách riêng tư
                        </a>
                    </Link>
                    <Link href="/dmca">
                        <a className="hover:text-primary">DMCA</a>
                    </Link>
                    <Link href="/contact">
                        <a className="hover:text-primary">Liên hệ</a>
                    </Link>
                </div>
            </div>

            <div className="my-4 mx-auto w-[70%] space-y-4 lg:w-1/2">
                <p className="text-center text-lg text-white/40 md:text-2xl">
                    Kyoto Manga không lưu trữ bất kì tệp tin nào trên máy chủ,
                    chúng tôi chỉ liên kết tới những phương tiện truyền thông
                    được lưu trữ bên dịch vụ thứ 3.
                </p>
                <p className="text-center text-lg text-white/40 md:text-2xl">
                    Kyoto Manga does not store any files on our server, we only
                    linked to the media which is hosted on 3rd party services.
                </p>
            </div>
        </footer>
    );
}
