import { DropDownLink } from '~/components/shared/DropDown';
import { MangaResource, SourcesId } from '~/types';

export const REVALIDATE_TIME = 3 * 60 * 60; //3h

//ref: src/pages
export const MANGA_PATH_NAME = 'manga';
//ref: src/pages
export const MANGA_BROWSE_PAGE = 'browse';
//ref: src/pages/manga
export const MANGA_PATH_DETAILS_NAME = 'details';
//ref: src/pages/manga
export const MANGA_PATH_READ_NAME = 'read';

export const DEFAULT_SRC: SourcesId = 'nt';

export const GENRES_NT = [
    { value: 'action', label: 'Action' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'anime', label: 'Anime' },
    { value: 'chuyen-sinh-213', label: 'Chuyển sinh' },
    { value: 'comedy-99', label: 'Comedy' },
    { value: 'comic', label: 'Comic' },
    { value: 'cooking', label: 'Cooking' },
    { value: 'co-dai-207', label: 'Cổ đại' },
    { value: 'doujinshi', label: 'Doujinshi' },
    { value: 'drama-103', label: 'Drama' },
    { value: 'dam-my', label: 'Đam mỹ' },
    { value: 'ecchi', label: 'Ecchi' },
    { value: 'fantasy-105', label: 'Fantasy' },
    { value: 'harem-107', label: 'Harem' },
    { value: 'historical', label: 'Historical' },
    { value: 'horror', label: 'Horror' },
    { value: 'josei', label: 'Josei' },
    { value: 'live-action', label: 'Live action' },
    { value: 'martial-arts', label: 'Martial Arts' },
    { value: 'mature', label: 'Mature' },
    { value: 'mecha-117', label: 'Mecha' },
    { value: 'ngon-tinh', label: 'Ngôn tình' },
    { value: 'one-shot', label: 'One shot' },
    { value: 'psychological', label: 'Psychological' },
    { value: 'romance-121', label: 'Romance' },
    { value: 'school-life', label: 'School Life' },
    { value: 'sci-fi', label: 'Sci-fi' },
    { value: 'seinen', label: 'Seinen' },
    { value: 'shoujo', label: 'Shoujo' },
    { value: 'shoujo-ai-126', label: 'Shoujo Ai' },
    { value: 'shounen-127', label: 'Shounen' },
    { value: 'shounen-ai', label: 'Shounen Ai' },
    { value: 'slice-of-life', label: 'Slice Of Life' },
    { value: 'soft-yaoi', label: 'Soft Yaoi' },
    { value: 'soft-yuri', label: 'Soft Yuri' },
    { value: 'sports', label: 'Sports' },
    { value: 'supernatural', label: 'Supernatural' },
    { value: 'smut', label: 'Smut' },
    { value: 'tap-chi-truyen-tranh', label: 'Tạp chí truyện tranh' },
    { value: 'thieu-nhi', label: 'Thiếu nhi' },
    { value: 'tragedy-136', label: 'Tragedy' },
    { value: 'trinh-tham', label: 'Trinh thám' },
    { value: 'truyen-scan', label: 'Truyện Scan' },
    { value: 'truyen-mau', label: 'Truyện màu' },
    { value: 'viet-nam', label: 'Việt Nam' },
    { value: 'webtoon', label: 'Webtoon' },
    { value: 'xuyen-khong-205', label: 'Xuyên không' },
    { value: '16', label: '16+' },
    { value: 'truong-thanh', label: 'Trưởng thành' },
];

export const VIEW_NT = [
    { value: 'all', label: 'Tất cả' },
    { value: 'month', label: 'Tháng' },
    { value: 'week', label: 'Tuần' },
    { value: 'day', label: 'Ngày' },
];

export const STATUS_NT = [
    { value: 'all', label: 'Tất cả' },
    { value: 'ongoing', label: 'Đang tiến hành' },
    { value: 'completed', label: 'Hoàn thành' },
    { value: 'new', label: 'Mới ra' },
    { value: 'latest', label: 'Chapter mới' },
];

export const COMIC_GENRES = [
    { value: 'manga-112', label: 'Manga' },
    { value: 'manhua', label: 'Manhua' },
    { value: 'manhwa-11400', label: 'Manhwa' },
    { value: 'doujinshi', label: 'Doujinshi' },
];

export const SORT = [
    { value: '1', label: '> 0' },
    { value: '50', label: '>= 50' },
    { value: '100', label: '>= 100' },
    { value: '200', label: '>= 200' },
    { value: '300', label: '>= 300' },
    { value: '400', label: '>= 400' },
    { value: '500', label: '>= 500' },
];

export const GENDER = [
    { value: '-1', label: 'Tất cả' },
    { value: '1', label: 'Con gái' },
    { value: '2', label: 'Con trai' },
];

export const MANGA_RESOURCE: MangaResource[] = [
    {
        sourceName: 'nettruyen',
        sourceId: 'nt',
    },
    {
        sourceName: 'lhmanga',
        sourceId: 'lh',
    },
    {
        sourceName: 'truyenqq',
        sourceId: 'qq',
    },
];

export const TailwindColors = [
    '#facc15',
    '#a3e635',
    '#fbbf24',
    '#34d399',
    '#fb923c',
    '#22d3ee',
    '#f87171',
    '#38bdf8',
    '#f472b6',
    '#818cf8',
    '#fb7185',
    '#a78bfa',
    '#e879f9',
];

export const MangaTypesPreview: DropDownLink[] = [
    {
        title: 'Manga',
        href: `/${MANGA_BROWSE_PAGE}?comics=manga-112`,
    },
    {
        title: 'Manhua',
        href: `/${MANGA_BROWSE_PAGE}?comics=manhua`,
    },
    {
        title: 'Manhwa',
        href: `/${MANGA_BROWSE_PAGE}?comics=manhwa-11400`,
    },
    {
        title: 'Doujinshi',
        href: `/${MANGA_BROWSE_PAGE}?comics=doujinshi`,
    },
];

export const MangaGenresPreview: DropDownLink[] = [
    {
        title: 'Action',
        href: `/${MANGA_BROWSE_PAGE}?genres=action`,
    },
    {
        title: 'Adventure',
        href: `/${MANGA_BROWSE_PAGE}?genres=adventure`,
    },
    {
        title: 'Comedy',
        href: `/${MANGA_BROWSE_PAGE}?genres=comedy-99`,
    },
    {
        title: 'Horror',
        href: `/${MANGA_BROWSE_PAGE}?genres=horror`,
    },
    {
        title: 'Romance',
        href: `/${MANGA_BROWSE_PAGE}?genres=romance-121`,
    },
    {
        title: 'Shoujo',
        href: `/${MANGA_BROWSE_PAGE}?genres=shoujo`,
    },
    {
        title: 'Slice of Life',
        href: `/${MANGA_BROWSE_PAGE}?genres=slice-of-life`,
    },
    {
        title: 'Drama',
        href: `/${MANGA_BROWSE_PAGE}?genres=drama-103`,
    },
    {
        title: 'Xem thêm',
        href: `/${MANGA_BROWSE_PAGE}`,
    },
];
