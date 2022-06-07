import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';

interface DetailsDescriptionProps {
    mobileUI: boolean;
}

export default function DetailsDescription({
    mobileUI,
}: DetailsDescriptionProps) {
    if (!mobileUI)
        return (
            <p className="my-4 text-white">
                &quot;One Piece xoay quanh 1 nhóm cướp biển được gọi là Băng Hải
                tặc Mũ Rơm - Straw Hat Pirates - được thành lập và lãnh đạo bởi
                thuyền trưởng Monkey D. Luffy. Cậu bé Luffy có ước mơ tìm thấy
                kho báu vĩ đại nhất, One Piece, của Vua Hải Tặc đời trước Gold
                D. Roger và trở thành Vua Hải Tặc đời kế tiếp. Ở Việt Nam hiện
                nay, truyện đang được Nhà xuất bản Thanh Hóa xuất bản nhưng
                không có bản quyền, với tên gọi là Đảo Hải tặc Cốt truyện:
                Monkey D. Luffy, 1 cậu bé rất thích hải tặc có ước mơ tìm được
                kho báu One Piece và trở thành Vua hải tặc - Pirate King. Lúc
                nhỏ, Luffy tình cờ ăn phải trái quỉ (Devil Fruit) Gomu Gomu, nó
                cho cơ thể cậu khả năng co dãn đàn hồi như cao su nhưng đổi lại
                cậu sẽ không bao giờ biết bơi. Sau đó Luffy lại được Shank cứu
                thoát tuy nhiên ông ta bị mất 1 cánh tay. Sau đấy Shank chia tay
                Luffy và để lại cho cậu cái mũ rơm (Straw Hat) và nói rằng: Sau
                này bao giờ thành cướp biển hãy gặp ta và trả lại nó. Chính lời
                nói này đã thúc đầy Luffy trở thành 1 cướp biển thật sự.&quot;
            </p>
        );

    return (
        <Disclosure>
            {({ open }) => {
                return (
                    <div
                        className={`${
                            open ? 'flex-col-reverse' : 'flex-col'
                        } flex`}
                    >
                        <Disclosure.Button className={'w-full'}>
                            <button className="flex w-full flex-col items-center bg-cyan-300/0 text-white">
                                Tóm tắt
                                {open ? (
                                    <ChevronUpIcon className="h-8 w-8" />
                                ) : (
                                    <ChevronDownIcon className="h-8 w-8" />
                                )}
                            </button>
                        </Disclosure.Button>

                        <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Disclosure.Panel>
                                <p className="text-white">
                                    &quot;One Piece xoay quanh 1 nhóm cướp biển
                                    được gọi là Băng Hải tặc Mũ Rơm - Straw Hat
                                    Pirates - được thành lập và lãnh đạo bởi
                                    thuyền trưởng Monkey D. Luffy. Cậu bé Luffy
                                    có ước mơ tìm thấy kho báu vĩ đại nhất, One
                                    Piece, của Vua Hải Tặc đời trước Gold D.
                                    Roger và trở thành Vua Hải Tặc đời kế tiếp.
                                    Ở Việt Nam hiện nay, truyện đang được Nhà
                                    xuất bản Thanh Hóa xuất bản nhưng không có
                                    bản quyền, với tên gọi là Đảo Hải tặc Cốt
                                    truyện: Monkey D. Luffy, 1 cậu bé rất thích
                                    hải tặc có ước mơ tìm được kho báu One Piece
                                    và trở thành Vua hải tặc - Pirate King. Lúc
                                    nhỏ, Luffy tình cờ ăn phải trái quỉ (Devil
                                    Fruit) Gomu Gomu, nó cho cơ thể cậu khả năng
                                    co dãn đàn hồi như cao su nhưng đổi lại cậu
                                    sẽ không bao giờ biết bơi. Sau đó Luffy lại
                                    được Shank cứu thoát tuy nhiên ông ta bị mất
                                    1 cánh tay. Sau đấy Shank chia tay Luffy và
                                    để lại cho cậu cái mũ rơm (Straw Hat) và nói
                                    rằng: Sau này bao giờ thành cướp biển hãy
                                    gặp ta và trả lại nó. Chính lời nói này đã
                                    thúc đầy Luffy trở thành 1 cướp biển thật
                                    sự.&quot;
                                </p>
                            </Disclosure.Panel>
                        </Transition>
                    </div>
                );
            }}
        </Disclosure>
    );
}
