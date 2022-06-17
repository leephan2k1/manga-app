import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { chapterModal } from '~/atoms/chapterModalAtom';
import { settingsModal } from '~/atoms/settingsModalAtom';

import {
    ArrowLeftIcon,
    ArrowNarrowLeftIcon,
    ArrowRightIcon,
    CogIcon,
} from '@heroicons/react/outline';

import ListBox from '../shared/ListBox';

export default function HorizontalSettings() {
    const [_, setShowModal] = useRecoilState(chapterModal);
    const [__, setSettingsModal] = useRecoilState(settingsModal);

    const router = useRouter();

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleOpenSettingsModal = () => {
        setSettingsModal(true);
    };

    return (
        <div className="slideUpReturn magictime fixed top-0 left-0 h-[60px] w-full bg-[#141313]">
            <div className="flex h-full w-full items-center text-lg md:text-2xl">
                <div className="flex h-full w-fit items-center gap-4 px-4 md:space-x-4">
                    <button onClick={() => router.back()}>
                        <ArrowNarrowLeftIcon className="h-8 w-8" />
                    </button>

                    <h1 className="fond-bold h-fit w-[20%]  capitalize line-clamp-1 md:w-[25%] ">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Earum voluptatum id ducimus necessitatibus recusandae?
                        Provident dolorum, excepturi dolores quis cum, sit
                        beatae ad magni, ducimus maxime tempora maiores at quam.
                    </h1>

                    <button
                        onClick={handleOpenModal}
                        className="h-[60%] max-w-[80px] whitespace-nowrap rounded-xl bg-highlight p-2 text-lg line-clamp-1"
                    >
                        Chapter 123
                    </button>

                    <div className="absolute-center h-full w-fit gap-4 md:mx-6">
                        <button className="rounded-lg bg-highlight p-2 md:p-4">
                            <ArrowLeftIcon className="h-6 w-6" />
                        </button>

                        <button className="rounded-lg bg-highlight p-2 md:p-4">
                            <ArrowRightIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                <div className="flex h-full w-fit items-center pr-2 md:gap-10 md:px-4">
                    <button className="hidden items-center justify-center md:flex">
                        <ListBox
                            style="rounded-xl p-4 gap-2 transition-all"
                            title="Nguồn: "
                            options={['NT']}
                            backgroundColor="bg-highlight"
                            activeBackgroundColor="bg-primary"
                        />
                    </button>

                    <button
                        onClick={handleOpenSettingsModal}
                        className="rounded-lg bg-highlight p-2"
                    >
                        <CogIcon className="h-8 w-8" />
                    </button>
                </div>
            </div>
        </div>
    );
}
