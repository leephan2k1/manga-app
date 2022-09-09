import { useAtom } from 'jotai';
import { Fragment } from 'react';
import { settingsModal } from '~/atoms/settingsModalAtom';
import Toggle from '~/components/buttons/ToggleButton';
import ListBox from '~/components/shared/ListBox';
import useSettingsMode from '~/context/SettingsContext';
import convertMode from '~/utils/modeConverter';

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface SettingsModeModalProps {
    handleConfig: (value: string) => void;
}

export default function SettingsModeModal({
    handleConfig,
}: SettingsModeModalProps) {
    const [modalState, setModalState] = useAtom(settingsModal);
    const settings = useSettingsMode();

    const handleCloseModal = () => {
        setModalState(false);
    };

    const handleSelect = (val: string) => {
        handleConfig(val);
    };

    const handleToggleAutoNextChap = (state: boolean) => {
        settings?.setAutoNext(state);
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

                <div className="fixed top-1/2 left-0 right-0 -translate-y-1/2">
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
                            <Dialog.Panel className="min-h-[350px] w-[85%] transform overflow-x-hidden rounded-2xl bg-background p-6 text-left align-middle shadow-xl transition-all md:w-[60%] lg:max-h-[85vh]">
                                <div className="flex items-center justify-between text-white">
                                    <Dialog.Title
                                        as="h3"
                                        className="my-4 mx-2 font-secondary text-4xl leading-6"
                                    >
                                        Cài đặt:
                                    </Dialog.Title>
                                    <button
                                        onClick={handleCloseModal}
                                        className="button rounded-full p-4 md:mr-6"
                                    >
                                        <XMarkIcon className="h-8 w-8" />
                                    </button>
                                </div>
                                <div className="mx-2 my-4 flex h-fit w-full flex-col gap-4   text-white">
                                    <div className="my-4 flex w-fit">
                                        <ListBox
                                            defaultOption={convertMode(
                                                settings?.readMode ||
                                                    'vertical',
                                            )}
                                            handleSelect={handleSelect}
                                            highlightSelect="text-primary mx-2"
                                            title="Chế độ đọc: "
                                            options={['ngang', 'dọc']}
                                        />
                                    </div>

                                    <div className="absolute-center my-4 flex w-fit">
                                        <h3>Chuyển chap tự động:</h3>
                                        <Toggle
                                            defaultState={settings?.autoNext}
                                            handleToggle={
                                                handleToggleAutoNextChap
                                            }
                                        />
                                    </div>

                                    {settings?.readMode === 'horizontal' && (
                                        <div className="my-4 flex w-fit">
                                            <ListBox
                                                defaultOption={convertMode(
                                                    settings?.readDirection ||
                                                        'rtl',
                                                )}
                                                handleSelect={handleSelect}
                                                highlightSelect="text-primary mx-2"
                                                title="Hướng đọc: "
                                                options={[
                                                    'phải sang trái',
                                                    'trái sang phải',
                                                ]}
                                            />
                                        </div>
                                    )}

                                    {settings?.readMode === 'vertical' && (
                                        <div className="my-4 flex w-fit">
                                            <ListBox
                                                defaultOption={convertMode(
                                                    settings?.imageMode ||
                                                        'full',
                                                )}
                                                handleSelect={handleSelect}
                                                highlightSelect="text-primary mx-2"
                                                title="Chế độ ảnh: "
                                                options={[
                                                    'full',
                                                    'fit width',
                                                    'fit height',
                                                ]}
                                            />
                                        </div>
                                    )}

                                    {settings?.readMode === 'vertical' && (
                                        <div className="my-4 flex w-fit">
                                            <ListBox
                                                defaultOption={convertMode(
                                                    settings?.nextDirection ||
                                                        'right',
                                                )}
                                                handleSelect={handleSelect}
                                                highlightSelect="text-primary mx-2"
                                                title="Chuyển chap bên: "
                                                options={[
                                                    'cạnh phải',
                                                    'cạnh trái',
                                                ]}
                                            />
                                        </div>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
