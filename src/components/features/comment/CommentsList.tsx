import { memo } from 'react';
import Comment from './Comment';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import CommentDisclosure from './CommentDisclosure';

interface CommentsListProps {
    styles?: string;
}

function CommentsList({ styles }: CommentsListProps) {
    const [animationParent] = useAutoAnimate<HTMLUListElement>();

    return (
        <div className={styles}>
            <ul ref={animationParent} className="full-size h-fit space-y-8">
                <li className="h-fit w-full rounded-2xl bg-deep-black px-4 py-8 md:px-6">
                    <Comment
                        commentId="1"
                        commentOwner="62b9644b7da94fabd47618e1"
                    />

                    {/* reply  */}
                    <ul className="my-6 h-fit w-full pl-14 md:pl-20 ">
                        <CommentDisclosure commentsLength={4}>
                            <li>
                                <Comment
                                    isSpoil
                                    commentId="2"
                                    commentOwner="62b9644b7da94fabd47618e1"
                                />
                            </li>
                            <li>
                                <Comment
                                    commentId="3"
                                    commentOwner="62b9644b7da94fabd47618e1"
                                />
                            </li>
                            <li>
                                <Comment
                                    commentId="4"
                                    commentOwner="62b9644b7da94fabd47618e1"
                                />
                            </li>
                        </CommentDisclosure>
                    </ul>
                </li>
                <li className="h-fit w-full rounded-2xl bg-deep-black px-4 py-8 md:px-6">
                    <Comment
                        commentId="5"
                        commentOwner="62f9466702469100e89db638"
                    />

                    {/* reply  */}
                    <ul className="my-6 h-fit w-full space-y-4 pl-14 md:pl-20">
                        <CommentDisclosure commentsLength={1}>
                            <li>
                                <Comment
                                    commentId="6"
                                    commentOwner="62b9644b7da94fabd47618e1"
                                />
                            </li>
                        </CommentDisclosure>
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default memo(CommentsList);
