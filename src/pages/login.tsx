import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import TextLogo from '~/components/icons/TextLogo';
import Head from '~/components/shared/Head';
import LogoSVG from '/public/images/torii-gate-japan.svg';
import usePreviousRoute from '~/context/HistoryRouteContext';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const LoginPage: NextPage = () => {
    const hsRouteCtx = usePreviousRoute();

    return (
        <div className="flex min-h-screen flex-col bg-background text-white">
            <Head title="Đăng nhập - Kyoto Manga" />

            <div className="absolute-center mx-auto h-screen w-full md:w-3/4">
                <div className="flex h-[450px] w-[300px] flex-col rounded-2xl bg-black/40 shadow-xl md:h-[550px] md:w-[400px]">
                    <div className="absolute-center relative my-2 flex h-[10%] w-full">
                        <button className="absolute top-1/2 left-0 -translate-y-1/2 p-6 transition-all hover:scale-110">
                            <Link
                                href={`${
                                    hsRouteCtx?.url ? hsRouteCtx?.url : '/'
                                }`}
                            >
                                <a>
                                    <ArrowLeftIcon className="h-8 w-8" />
                                </a>
                            </Link>
                        </button>
                        <h1 className="font-secondary text-4xl">Đăng nhập</h1>
                    </div>

                    <div className="absolute-center relative h-[25%] w-full">
                        <TextLogo className="z-10 h-[40px] w-[130px] fill-white md:h-[50px] md:w-[200px]" />
                        <figure className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2">
                            <LogoSVG width={50} height={50} />
                        </figure>
                    </div>

                    <div className="relative flex h-[60%] w-full flex-col items-center gap-10 pt-4">
                        <button
                            onClick={() =>
                                signIn('google', {
                                    callbackUrl: `${
                                        hsRouteCtx?.url ? hsRouteCtx?.url : '/'
                                    }`,
                                })
                            }
                            className="z-10 w-3/4 justify-evenly space-x-4 rounded-2xl bg-white py-4 text-black transition-all duration-300 hover:scale-95"
                        >
                            <FcGoogle className="inline-block h-8 w-8" />{' '}
                            <span>Đăng nhập với Google</span>
                        </button>
                        <button
                            onClick={() =>
                                signIn('facebook', {
                                    callbackUrl: `${
                                        hsRouteCtx?.url ? hsRouteCtx?.url : '/'
                                    }`,
                                })
                            }
                            className="z-10 w-3/4 justify-evenly space-x-4 rounded-2xl bg-blue-600 py-4 transition-all duration-300 hover:scale-95"
                        >
                            <FaFacebookF className="inline-block h-8 w-8" />{' '}
                            <span>Đăng nhập với Facebook</span>
                        </button>

                        <figure
                            style={{
                                backgroundImage: `url(/images/jp-art.png)`,
                            }}
                            className="absolute -bottom-8 left-0 z-0 h-96 w-full bg-cover bg-no-repeat"
                        ></figure>
                    </div>
                </div>
            </div>
        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
LoginPage.getLayout = (page: ReactNode) => page;

export default LoginPage;
