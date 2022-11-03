import { memo } from 'react';
import Comment from './Comment';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import CommentDisclosure from './CommentDisclosure';
import { useReadLocalStorage } from 'usehooks-ts';
import useComment from '~/context/CommentContext';
import { If, Then, Else } from 'react-if';

interface CommentsListProps {
    styles?: string;
}

function CommentsList({ styles }: CommentsListProps) {
    const comment = useComment();

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
                <If condition={comment?.isFetching}>
                    <Then>
                        {Array.from(new Array(3).keys()).map((dumpElem) => {
                            return (
                                <li
                                    key={dumpElem}
                                    className="loading-pulse h-[200px] w-full rounded-2xl bg-white/5 px-4 py-8 md:h-[250px] md:px-6"
                                ></li>
                            );
                        })}
                    </Then>

                    <Else>
                        <If
                            condition={
                                comment?.comments &&
                                Array.isArray(comment?.comments) &&
                                comment?.comments.length
                            }
                        >
                            <Then>
                                {comment?.comments?.map((cmt) => {
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
                                                    Array.isArray(
                                                        cmt.replies,
                                                    ) &&
                                                    cmt.replies.length
                                                }
                                            >
                                                <Then>
                                                    <ul className="my-6 h-fit w-full pl-14 md:pl-20 ">
                                                        <CommentDisclosure
                                                            commentsLength={
                                                                cmt.replies
                                                                    .length
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
                            </Then>
                        </If>
                    </Else>
                </If>
            </ul>
        </div>
    );
}

export default memo(CommentsList);
