import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { Disclosure, useDisclosureState } from 'ariakit/disclosure';
import { memo, ReactNode } from 'react';
import { If, Then, Else } from 'react-if';

interface CommentDisclosureProps {
    commentsLength: number;
    children: ReactNode;
}

function CommentDisclosure({
    children,
    commentsLength,
}: CommentDisclosureProps) {
    const [animationParent] = useAutoAnimate<HTMLDivElement>();
    const disclosure = useDisclosureState();

    return (
        <div className="wrapper h-fit">
            <div className="space-y-6" ref={animationParent}>
                {disclosure.open && children}
            </div>

            <Disclosure
                state={disclosure}
                className="button smooth-effect flex space-x-4 rounded-xl px-4 py-2"
            >
                <span>{commentsLength} trả lời</span>{' '}
                <If condition={disclosure?.open}>
                    <Then>
                        <ChevronUpIcon className="h-8 w-8" />
                    </Then>

                    <Else>
                        <ChevronDownIcon className="h-8 w-8" />
                    </Else>
                </If>
            </Disclosure>
        </div>
    );
}

export default memo(CommentDisclosure);
