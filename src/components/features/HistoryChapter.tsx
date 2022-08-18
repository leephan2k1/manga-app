import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { Fragment, memo, useState, useEffect } from 'react';
import { useEffectOnce } from 'usehooks-ts';
import useMultipleSources from '~/context/SourcesContext';
import useChapter from '~/hooks/useChapters';
import { axiosClientV2 } from '~/services/axiosClient';
import { motion } from 'framer-motion';

function ReadingHistoryModal() {
    const router = useRouter();
    const { params } = router.query;
    const chapter = useChapter();
    const multipleSources = useMultipleSources();
    const [shouldSave, setShouldSave] = useState(false);
    const [modalState, setModalState] = useState(false);
    const [previousChapter, setPreviousChapter] = useState('');

    const handleCloseModal = () => {
        setModalState(false);
        setShouldSave(true);
    };

    useEffect(() => {
        const source = (params && params[0]) || 'NTC';
        const chapterSlug = `/${
            params &&
            Array.isArray(params.slice(2)) &&
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            params.slice(2).join('/')
        }`;

        if (shouldSave)
            chapter.saveCurrentChapter(
                source,
                String(multipleSources?.chaptersDetail.comicSlug),
                chapterSlug,
                String(params && params[1]),
            );
    }, [params, router, shouldSave]);

    useEffectOnce(() => {
        (async function () {
            try {
                const userPayload = await chapter.getUserHistory();

                if (!userPayload) {
                    setShouldSave(true);
                    return;
                }

                const currentChapter = userPayload.save_list.find(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    (e) =>
                        e.comicSlug ===
                        multipleSources?.chaptersDetail.comicSlug,
                );

                if (currentChapter) {
                    const paramChapterNumber = params && params[1];

                    if (currentChapter.chapterNumber === paramChapterNumber) {
                        setShouldSave(true);
                        return;
                    }

                    setModalState(true);
                    setPreviousChapter(currentChapter.chapterNumber);
                } else {
                    setShouldSave(true);
                }
            } catch (error) {}
        })();
    });

    const handleGoToPreviousChapter = async () => {
        try {
            NProgress.start();

            const userPayload = await chapter.getUserHistory();

            if (userPayload) {
                const currentChapter = userPayload.save_list.find(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    (e) =>
                        e.comicSlug ===
                        multipleSources?.chaptersDetail.comicSlug,
                );

                if (currentChapter) {
                    setModalState(true);

                    await axiosClientV2.post('/chapters', {
                        chapterSlug: currentChapter.chapterSlug,
                        source: currentChapter.source,
                        comicName: multipleSources?.chaptersDetail.comicName,
                        comicSlug: currentChapter.comicSlug,
                    });

                    router.push(
                        `${currentChapter.source}/${currentChapter.chapterNumber}${currentChapter.chapterSlug}`,
                    );

                    setModalState(false);

                    setShouldSave(true);
                }
            }
        } catch (error) {
            console.log(error);
            NProgress.done();
        }
    };

    return (
        <Transition appear show={modalState} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-[999]"
                onClose={handleCloseModal}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed top-1/2  left-1/2 -translate-y-1/2 -translate-x-1/2 lg:left-[calc(50%_+_150px)]">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <motion.div
                                className="h-full w-full"
                                initial={{ y: -150 }}
                                animate={{ y: 0 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 135,
                                }}
                            >
                                <Dialog.Panel className="h-[350px] min-w-[300px] transform overflow-hidden rounded-2xl bg-background p-6 text-left align-middle shadow-xl transition-all lg:max-h-[85vh]">
                                    <div className="flex items-center  justify-between text-white">
                                        <Dialog.Title
                                            as="h3"
                                            className="my-4 mx-2 font-secondary text-3xl uppercase leading-6"
                                        >
                                            Tiếp tục đọc
                                        </Dialog.Title>
                                        <button
                                            onClick={handleCloseModal}
                                            className="button rounded-full p-4"
                                        >
                                            <XIcon className="h-8 w-8" />
                                        </button>
                                    </div>
                                    <div className="mx-2 my-4 flex h-fit w-full flex-col gap-4 text-white/60">
                                        <h1 className="text-center">
                                            Kyoto Manga đã giúp bạn lưu lại chap{' '}
                                            <span className="text-white">
                                                {previousChapter}
                                            </span>{' '}
                                            trước đó
                                        </h1>
                                    </div>
                                    <div className="mx-2 my-4 flex h-fit w-full flex-col gap-4 text-white/60">
                                        <h2 className="text-center">
                                            User-kun có muốn đọc tiếp không?
                                        </h2>
                                    </div>

                                    <div className="mx-2 mb-4 mt-10 flex h-1/2 w-full flex-col items-center justify-center space-y-6 text-white lg:justify-around lg:space-y-2">
                                        <button
                                            onClick={() => handleCloseModal()}
                                            className="min-w-[125px] rounded-2xl border-[1px] border-primary p-4 transition-all duration-300 hover:scale-[110%]"
                                        >
                                            Không cảm ơn
                                        </button>
                                        <button
                                            onClick={handleGoToPreviousChapter}
                                            className="min-w-[125px] rounded-2xl  bg-primary p-4 transition-all duration-300 hover:scale-[110%]"
                                        >
                                            Có
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </motion.div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default memo(ReadingHistoryModal);
