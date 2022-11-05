import { useAutoAnimate } from '@formkit/auto-animate/react';
import { memo } from 'react';
import { Else, If, Then } from 'react-if';
import { useReadLocalStorage } from 'usehooks-ts';
import useComment from '~/context/CommentContext';
import Comment from './Comment';
import CommentDisclosure from './CommentDisclosure';

interface CommentsListProps {
    styles?: string;
}

function CommentsList({ styles }: CommentsListProps) {
    const commentCtx = useComment();

    const commentTextColor = useReadLocalStorage('commentTextColor');

    const [animationParent] = useAutoAnimate<HTMLUListElement>();

    return (
        <div className={styles}>
            <ul
                style={{
                    color: commentTextColor
                        ? String(commentTextColor)
                        : '#f9fafb',
                }}
                ref={animationParent}
                className="full-size h-fit space-y-8"
            >
                <If condition={commentCtx?.isFetching}>
                    <Then>
                        {Array.from(new Array(3).keys()).map((dumbElem) => {
                            return (
                                <li
                                    key={dumbElem}
                                    className="loading-pulse h-[200px] w-full rounded-2xl bg-white/5 px-4 py-8 md:h-[250px] md:px-6"
                                ></li>
                            );
                        })}
                    </Then>

                    <Else>
                        {commentCtx?.comments &&
                            Array.isArray(commentCtx?.comments) &&
                            commentCtx?.comments.length &&
                            commentCtx?.comments?.map((cmt) => {
                                return (
                                    <li
                                        key={cmt._id}
                                        className="h-fit w-full rounded-2xl bg-deep-black px-4 py-8 md:px-6"
                                    >
                                        <Comment comment={cmt} />

                                        {/* reply  */}
                                        <If
                                            condition={
                                                cmt.replies &&
                                                Array.isArray(cmt.replies) &&
                                                cmt.replies.length
                                            }
                                        >
                                            <Then>
                                                <ul className="my-6 h-fit w-full pl-14 md:pl-20 ">
                                                    <CommentDisclosure
                                                        commentsLength={
                                                            cmt.replies.length
                                                        }
                                                    >
                                                        {cmt.replies.map(
                                                            (rep) => {
                                                                return (
                                                                    <li
                                                                        key={
                                                                            rep._id
                                                                        }
                                                                    >
                                                                        <Comment
                                                                            comment={
                                                                                rep
                                                                            }
                                                                        />
                                                                    </li>
                                                                );
                                                            },
                                                        )}
                                                    </CommentDisclosure>
                                                </ul>
                                            </Then>
                                        </If>
                                    </li>
                                );
                            })}
                    </Else>
                </If>
            </ul>
        </div>
    );
}

export default memo(CommentsList);
