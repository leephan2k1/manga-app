import dynamic from 'next/dynamic';
import { ChangeEvent, Fragment, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useDebounce } from 'usehooks-ts';
import { searchModalState } from '~/atoms/searchModelAtom';
import RepositoryFactory from '~/services/repositoryFactory';
import { NtSearchResponseData } from '~/types';

import { Dialog, Transition } from '@headlessui/react';
import { EmojiSadIcon, XIcon } from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';

const SearchResult = dynamic(() => import('./SearchResult'));

const NtAPI = RepositoryFactory('nettruyen');

export default function SearchModal() {
    const [showModal, setShowModal] = useRecoilState(searchModalState);
    const [showBtnClearInput, setShowBtnClearInput] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [mangaResult, setMangaResult] = useState<
        NtSearchResponseData[] | string
    >([]);
    const debouncedValue = useDebounce<string>(searchValue, 500);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setIsSearching(true);
        setMangaResult([]);

        if (e.currentTarget.value) {
            setSearchValue(e.currentTarget.value.trim());
        } else {
            setIsSearching(false);
        }
    };

    const handleClearSearchValue = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
            setSearchValue('');
        }
        setShowBtnClearInput(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setShowBtnClearInput(false);
        setSearchValue('');
        setIsSearching(false);
        setMangaResult([]);
    };

    useEffect(() => {
        //fetch api
        (async function () {
            if (debouncedValue) {
                try {
                    setIsSearching(true);
                    //await fetch api
                    const result = await NtAPI?.search(debouncedValue);

                    if (result?.status === 200) {
                        setMangaResult(result.data.data);
                    }
                } catch (err) {
                    setMangaResult('notFound');
                    console.log(err);
                } finally {
                    setIsSearching(false);
                }
            }
        })();

        return () => {
            handleCloseModal();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue]);

    const handleOpenButtonClearSearch = () => {
        //Displayed only when input has value
        if (inputRef.current?.value) {
            setShowBtnClearInput(true);
        }
    };

    return (
        <Transition appear show={showModal} as={Fragment}>
            <Dialog
                initialFocus={inputRef}
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
                                        className="my-4 mx-2 font-secondary text-4xl leading-6 text-white md:text-6xl"
                                    >
                                        Tìm Truyện
                                    </Dialog.Title>
                                    <button
                                        className="button rounded-full p-4 text-white md:mr-6"
                                        onClick={handleCloseModal}
                                    >
                                        <XIcon className="h-10 w-10" />
                                    </button>
                                </div>
                                <div className="my-10 flex h-[60px] items-center rounded-xl bg-secondary py-4 text-white">
                                    {/* search icon  */}
                                    <SearchIcon className="mx-2 h-10 w-10 md:mx-6 md:h-14 md:w-14" />
                                    {/* search input  */}
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        className="w-full bg-transparent p-4"
                                        onBlur={handleOpenButtonClearSearch}
                                        onFocus={() =>
                                            setShowBtnClearInput(false)
                                        }
                                        onChange={handleSearch}
                                    />
                                    {/* clear input  */}
                                    {showBtnClearInput && (
                                        <button
                                            className="absolute-center m-4 h-10 w-10 rounded-lg bg-primary text-white hover:opacity-60 md:h-14 md:w-14 md:rounded-xl"
                                            onClick={handleClearSearchValue}
                                        >
                                            <XIcon className="h-8 w-8" />
                                        </button>
                                    )}
                                </div>

                                {/* loading  */}
                                {isSearching && (
                                    <div className="absolute-center w-full">
                                        <div className="dot-pulse"></div>
                                    </div>
                                )}

                                {Array.isArray(mangaResult) &&
                                    mangaResult.length > 0 && (
                                        <SearchResult data={mangaResult} />
                                    )}

                                {/* result not found */}
                                {mangaResult === 'notFound' && (
                                    <div className="absolute-center mx-auto my-4 w-3/4 rounded-xl bg-secondary py-4 text-white">
                                        <p className="mr-4 whitespace-nowrap text-base md:text-2xl">
                                            Truyện bạn cần tìm chưa có!
                                        </p>
                                        <EmojiSadIcon className="h-10 w-10" />
                                    </div>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
