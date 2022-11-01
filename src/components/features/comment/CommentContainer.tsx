import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { memo } from 'react';
import { Else, If, Then } from 'react-if';
import { useAtomValue } from 'jotai';
import { confirmModal } from '~/atoms/confirmModalAtom';

import CommentInput from './CommentInput';
import CommentsList from './CommentsList';

const ConfirmModal = dynamic(
    () =>
        import('~/components/shared/ConfirmModal', {
            ssr: false,
        } as ImportCallOptions),
);

const commentStylesContainer = 'mx-auto w-full md:w-4/5 lg:w-3/4 my-4';

function CommentContainer() {
    const { status } = useSession();

    const shouldMountConfirmModal = useAtomValue(confirmModal);

    return (
        <div className="full-size py-4">
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            {shouldMountConfirmModal && <ConfirmModal />}
            <If condition={status !== 'authenticated'}>
                <Then>
                    <div
                        className={`${commentStylesContainer} absolute-center h-20 rounded-2xl bg-deep-black`}
                    >
                        <h3>
                            <Link href={'/login'}>
                                <a className="smooth-effect rounded-xl text-primary hover:bg-highlight hover:px-4 hover:py-2">
                                    Đăng nhập
                                </a>
                            </Link>{' '}
                            để bình luận bạn nhé!
                        </h3>
                    </div>
                </Then>

                <Else>
                    <CommentInput
                        inputMode="new"
                        containerStyles={commentStylesContainer}
                    />
                </Else>
            </If>

            <CommentsList styles={commentStylesContainer} />
        </div>
    );
}

export default memo(CommentContainer);
