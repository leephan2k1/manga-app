import { useRouter } from 'next/router';
import { useEffect, useRef, useState, MouseEvent } from 'react';
import { FOLLOW_STATE, MANGA_PATH_FOLLOW } from '~/constants';

export default function TabSelect() {
    const router = useRouter();
    const [currentTab, setTabIndex] = useState(0);
    const [offsetLeft, setOffsetLeft] = useState(20);
    const effectActive = useRef<HTMLLIElement>(null);

    const handleSelectValue = (e: MouseEvent<HTMLButtonElement>) => {
        const titleValue = e.currentTarget.textContent;

        const statusId = FOLLOW_STATE.find(
            (stt) => stt.title === titleValue,
        )?.id;

        if (statusId) {
            router.replace(
                `${MANGA_PATH_FOLLOW}?status=${statusId}`,
                undefined,
                { shallow: true },
            );
        }
    };

    useEffect(() => {
        const currentTabElem = document.querySelector(
            `#tab-select-${currentTab}`,
        );
        if (effectActive.current)
            effectActive.current.style.cssText = `transform: translateX(${offsetLeft}px); width: ${currentTabElem?.clientWidth}px;`;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offsetLeft]);

    return (
        <div className="my-8 w-full overflow-x-auto">
            <ul className="relative flex w-fit flex-nowrap gap-8 overflow-y-hidden rounded-md bg-highlight py-2 px-4 font-secondary text-3xl capitalize">
                {FOLLOW_STATE.map((state, index) => {
                    return (
                        <li
                            id={`tab-select-${index}`}
                            className={`${
                                currentTab === index
                                    ? ' text-white'
                                    : 'bg-transparent text-white/25'
                            } z-10 whitespace-nowrap  rounded-md p-4 transition-all`}
                            key={index}
                        >
                            <button
                                onClick={(e) => {
                                    handleSelectValue(e);
                                    setOffsetLeft(e.currentTarget.offsetLeft);
                                    setTabIndex(index);
                                }}
                            >
                                {state.title}
                            </button>
                        </li>
                    );
                })}

                <li
                    ref={effectActive}
                    className="selector-menu absolute -left-4 z-0 h-[80%] rounded-md bg-black/40 duration-150 ease-out"
                ></li>
            </ul>
        </div>
    );
}
