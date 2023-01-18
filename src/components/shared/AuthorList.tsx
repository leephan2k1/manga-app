import { memo } from 'react';
import AuthorItem from './AuthorItem';

function AuthorList() {
    return (
        <ul className="grid h-fit w-full grid-cols-2 gap-y-4 gap-x-6 md:grid-cols-3 lg:grid-cols-5">
            <AuthorItem />
            <AuthorItem />
            <AuthorItem />
            <AuthorItem />
            <AuthorItem />
            <AuthorItem />
            <AuthorItem />
        </ul>
    );
}

export default memo(AuthorList);
