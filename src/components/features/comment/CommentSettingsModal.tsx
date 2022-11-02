import { Dialog, Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import { Fragment, memo } from 'react';
import { commentSettingsModal } from '~/atoms/commentSettingsModal';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Toggle from '~/components/buttons/ToggleButton';
import { COLORS_OPTIONS } from '~/constants';
import { useLocalStorage } from 'usehooks-ts';

function CommentSettingsModal() {
    const [isOpen, closeModal] = useAtom(commentSettingsModal);
    const [autoComplete, setAutoComplete] = useLocalStorage(
        'autoComplete',
        true,
    );
    const [commentTextColor, setCommentTextColor] = useLocalStorage(
        'commentTextColor',
        '#f9fafb',
    );

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
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
                            <Dialog.Panel className="flex h-[300px] w-[300px] transform flex-col justify-between overflow-hidden rounded-2xl bg-deep-black p-6 text-left align-middle text-white shadow-xl transition-all md:w-[400px]">
                                <div className="flex h-4/5 w-full flex-col">
                                    <Dialog.Title
                                        as="h3"
                                        className="my-6 flex items-start justify-between text-4xl font-medium uppercase leading-6"
                                    >
                                        <span className="absolute-center h-full w-fit">
                                            Cài đặt
                                        </span>
                                        <button
                                            onClick={() => closeModal(false)}
                                            className="smooth-effect rounded-2xl border border-white p-2 hover:scale-110"
                                        >
                                            <XMarkIcon className="h-8 w-8" />
                                        </button>
                                    </Dialog.Title>
                                    <div className="my-4 mt-2 flex h-fit flex-col justify-evenly space-y-10">
                                        <div className="flex space-x-4">
                                            <h4>Gợi ý gõ:</h4>
                                            <Toggle
                                                defaultState={autoComplete}
                                                handleToggle={(state) => {
                                                    setAutoComplete(state);
                                                }}
                                            />
                                        </div>
                                        <div className="flex space-x-4">
                                            <h4>Theme:</h4>
                                            <div className="flex items-center space-x-6">
                                                {COLORS_OPTIONS.map((color) => {
                                                    return (
                                                        <button
                                                            onClick={() =>
                                                                setCommentTextColor(
                                                                    color,
                                                                )
                                                            }
                                                            key={color}
                                                            style={{
                                                                backgroundColor:
                                                                    color,
                                                            }}
                                                            className={`smooth-effect h-6 w-6 rounded-full ${
                                                                commentTextColor ===
                                                                    color &&
                                                                'outline-3 outline-double outline-sky-500'
                                                            } hover:scale-110`}
                                                        ></button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default memo(CommentSettingsModal);
