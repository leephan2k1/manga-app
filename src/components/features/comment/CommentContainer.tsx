import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { memo } from 'react';
import { Else, If, Then } from 'react-if';
import CommentInput from './CommentInput';

const commentStylesContainer = 'mx-auto w-full md:w-4/5 lg:w-3/4';

function CommentContainer() {
    const { status } = useSession();

    return (
        <div className="full-size py-4">
            <If condition={status !== 'authenticated'}>
                <Then>
                    <div className="absolute-center mx-auto h-20 w-full rounded-2xl bg-deep-black md:w-4/5 lg:w-3/4">
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
                    <CommentInput containerStyles={commentStylesContainer} />
                </Else>
            </If>
        </div>
    );
}

export default memo(CommentContainer);
