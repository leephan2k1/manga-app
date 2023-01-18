import { memo } from 'react';
import AuthorItem from './AuthorItem';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import axios from 'axios';
import { Author } from '~/types';

function AuthorList() {
    const [animationParent] = useAutoAnimate<HTMLUListElement>();
    const { data: session } = useSession();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userId = session?.user.id;

    const { data: authors } = useSWR<Author[]>(
        `/api/users/followAuthor?userId=${userId}`,
        async (slug) => {
            const { authors } = await (await axios.get(slug)).data;

            return authors;
        },
    );

    return (
        <ul
            ref={animationParent}
            className="grid h-fit w-full grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5"
        >
            {authors &&
                authors.length > 0 &&
                authors.map((author) => {
                    return <AuthorItem author={author} key={author._id} />;
                })}
        </ul>
    );
}

export default memo(AuthorList);
