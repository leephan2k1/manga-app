import { Fragment } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { chapterList } from '~/atoms/chapterListAtom';
import { chapterModal } from '~/atoms/chapterModalAtom';

import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

import DetailsChapterList from '../shared/DetailsChapterList';
import { useRouter } from 'next/router';

export default function ChapterModal() {
    const [showModal, setShowModal] = useRecoilState(chapterModal);
    const chapters = useRecoilValue(chapterList);
    const router = useRouter();

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Transition appear show={showModal} as={Fragment}>
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

                <div className="fixed top-[10%] left-0 right-0 overflow-y-auto">
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
                            <Dialog.Panel className="max-h-[70vh] w-[85%] transform overflow-x-hidden overflow-y-scroll rounded-2xl bg-background p-6 text-left align-middle shadow-xl transition-all md:w-[75%] lg:max-h-[85vh]">
                                <div className="flex items-center justify-between">
                                    <Dialog.Title
                                        as="h3"
                                        className="my-4 mx-2 font-secondary text-2xl leading-6 text-white md:text-4xl"
                                    >
                                        Chapters:
                                    </Dialog.Title>
                                    <button
                                        onClick={handleCloseModal}
                                        className="button rounded-full p-4 text-white md:mr-6"
                                    >
                                        <XIcon className="h-8 w-8" />
                                    </button>
                                </div>
                                <div className="my-4 flex flex-col">
                                    <DetailsChapterList
                                        maxWTitleMobile={90}
                                        containerStyle="flex h-fit w-full flex-col overflow-x-hidden rounded-xl bg-highlight"
                                        mobileHeight={300}
                                        selectSource={false}
                                        comicSlug={
                                            (router.query.params &&
                                                router.query.params[0]) ||
                                            ''
                                        }
                                        mobileUI={true}
                                        chapterList={chapters}
                                    />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
