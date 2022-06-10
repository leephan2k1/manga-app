import {
    COMIC_GENRES,
    GENDER,
    GENRES_NT,
    SORT,
    STATUS_NT,
    VIEW_NT,
} from '~/constants';

import FilterItem from '../shared/FilterItem';

export default function Filters() {
    return (
        <div className="grid min-h-[100px] w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            <FilterItem
                isMulti={true}
                instanceId="genres"
                title="Thể loại"
                placeholder="thể loại..."
                defaultValue={GENRES_NT[0]}
                options={GENRES_NT}
            />
            <FilterItem
                title="Top lượt xem"
                instanceId="view"
                placeholder="thể loại..."
                defaultValue={VIEW_NT[0]}
                options={VIEW_NT}
            />
            <FilterItem
                title="Trạng thái"
                instanceId="status"
                placeholder="trạng thái..."
                defaultValue={STATUS_NT[0]}
                options={STATUS_NT}
            />
            <FilterItem
                isMulti={true}
                title="Loại truyện"
                instanceId="comic-genres"
                placeholder="trạng thái..."
                defaultValue={COMIC_GENRES[0]}
                options={COMIC_GENRES}
            />
            <FilterItem
                title="Số chương"
                instanceId="chapter"
                placeholder="số chương..."
                defaultValue={SORT[0]}
                options={SORT}
            />
            <FilterItem
                title="Giới tính"
                instanceId="gender"
                placeholder="giới tính..."
                defaultValue={GENDER[0]}
                options={GENDER}
            />
        </div>
    );
}
