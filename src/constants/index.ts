import { DropDownLink } from '~/components/shared/DropDown';
import { MangaResource, SourcesId, FollowState } from '~/types';

export const REVALIDATE_TIME = 3 * 60 * 60; //3h
export const REVALIDATE_TIME_DETAILS_PAGE = 5 * 60; //5m

export const SERVER_SUB_PATH = process.env.NEXT_PUBLIC_SERVER_SUB_PATH || '';

//ref: src/pages
export const MANGA_PATH_NAME = 'manga';
//ref: src/pages
export const MANGA_BROWSE_PAGE = 'browse';
//ref: src/pages/manga
export const MANGA_PATH_DETAILS_NAME = 'details';
//ref: src/pages/manga
export const MANGA_PATH_READ_NAME = 'read';
//ref: src/pages
export const MANGA_PATH_FOLLOW = 'follows';
//ref: src/pages
export const MANGA_AUTHOR_PATH = 'author';

export const DEFAULT_SRC: SourcesId = 'NTC';

export const PROXY_SERVER = process.env.NEXT_PUBLIC_PROXY_SERVER;

export const WEBSITE_URL = 'https://kyotomanga.live';

export const SOURCE_COLLECTIONS: { [key: string]: string } = {
    NTC: 'https://www.nettruyenco.vn',
    LHM: 'https://truyentranhlh.net',
    OTK: 'https://otakusan.net',
};

export const COLORS_OPTIONS = [
    '#f9fafb',
    '#ef4444',
    '#f97316',
    '#eab308',
    '#22c55e',
    '#0ea5e9',
    '#a855f7',
];

export const DEFAULT_REACTIONS = [
    { emoji: '👍', label: 'thumbs_up' },
    { emoji: '❤', label: 'heart' },
    { emoji: '🤡', label: 'clown_face' },
    { emoji: '😡', label: 'enraged_face' },
];

export const emojisToBeUsed = [
    { emoji: '🤡', label: 'clown face' },
    { emoji: '😀', label: 'grinning face' },
    { emoji: '😄', label: 'grinning face with smiling eyes' },
    { emoji: '😁', label: 'beaming face with smiling eyes' },
    { emoji: '😅', label: 'grinning face with sweat' },
    { emoji: '🤣', label: 'rolling on the floor laughing' },
    { emoji: '😂', label: 'face with tears of joy' },
    { emoji: '😘', label: 'face blowing a kiss' },
    { emoji: '😙', label: 'kissing face with smiling eyes' },
    { emoji: '😋', label: 'face savoring food' },
    { emoji: '🤐', label: 'zipper-mouth face' },
    { emoji: '😶', label: 'face without mouth' },
    { emoji: '🙄', label: 'grimacing face' },
    { emoji: '🥴', label: 'woozy face' },
    { emoji: '😵', label: 'face with crossed-out eyes' },
    { emoji: '😎', label: 'smiling face with sunglasses' },
    { emoji: '😰', label: 'anxious face with sweat' },
    { emoji: '😭', label: 'loudly crying face' },
    { emoji: '😞', label: 'disappointed face' },
    { emoji: '😡', label: 'enraged face' },
    { emoji: '💀', label: 'skull' },
    { emoji: '👺', label: 'goblin' },
    { emoji: '❤', label: 'heart' },
    { emoji: '👋', label: 'waving hand' },
    { emoji: '👌', label: 'OK hand' },
    { emoji: '🤟', label: 'love-you gesture' },
    { emoji: '👉', label: 'backhand index pointing right' },
    { emoji: '👍', label: 'thumbs up' },
    { emoji: '👎', label: 'thumbs down' },
    { emoji: '👈', label: 'backhand index pointing left' },
    { emoji: '🙏', label: 'folded hands' },
    { emoji: '👀', label: 'eyes' },
];

export const FOLLOW_STATE: Array<{ id: FollowState; title: string }> = [
    {
        id: 'reading',
        title: 'Đang đọc',
    },
    {
        id: 'completed',
        title: 'Hoàn thành',
    },
    {
        id: 'dropped',
        title: 'Tạm ngưng',
    },
    {
        id: 'on-hold',
        title: 'Giữ lại',
    },
    {
        id: 'plan-to-read',
        title: 'Dự định đọc',
    },
    {
        id: 're-reading',
        title: 'Đọc lại',
    },
    {
        id: 'author',
        title: 'Tác giả',
    },
];

export const GENRES_NT = [
    { id: '1', value: 'action', label: 'Action' },
    { id: '3', value: 'adventure', label: 'Adventure' },
    { id: '4', value: 'anime', label: 'Anime' },
    { id: '5', value: 'chuyen-sinh-213', label: 'Chuyển sinh' },
    { id: '6', value: 'comedy-99', label: 'Comedy' },
    { id: '7', value: 'comic', label: 'Comic' },
    { id: '8', value: 'cooking', label: 'Cooking' },
    { id: '9', value: 'co-dai-207', label: 'Cổ đại' },
    { id: '10', value: 'doujinshi', label: 'Doujinshi' },
    { id: '11', value: 'drama-103', label: 'Drama' },
    { id: '12', value: 'dam-my', label: 'Đam mỹ' },
    { id: '13', value: 'ecchi', label: 'Ecchi' },
    { id: '14', value: 'fantasy-105', label: 'Fantasy' },
    { id: '16', value: 'harem-107', label: 'Harem' },
    { id: '17', value: 'historical', label: 'Historical' },
    { id: '18', value: 'horror', label: 'Horror' },
    { id: '20', value: 'josei', label: 'Josei' },
    { id: '21', value: 'live-action', label: 'Live action' },
    { id: '26', value: 'martial-arts', label: 'Martial Arts' },
    { id: '27', value: 'mature', label: 'Mature' },
    { id: '28', value: 'mecha-117', label: 'Mecha' },
    { id: '32', value: 'ngon-tinh', label: 'Ngôn tình' },
    { id: '33', value: 'one-shot', label: 'One shot' },
    { id: '34', value: 'psychological', label: 'Psychological' },
    { id: '35', value: 'romance-121', label: 'Romance' },
    { id: '36', value: 'school-life', label: 'School Life' },
    { id: '37', value: 'sci-fi', label: 'Sci-fi' },
    { id: '38', value: 'seinen', label: 'Seinen' },
    { id: '39', value: 'shoujo', label: 'Shoujo' },
    { id: '40', value: 'shoujo-ai-126', label: 'Shoujo Ai' },
    { id: '41', value: 'shounen-127', label: 'Shounen' },
    { id: '42', value: 'shounen-ai', label: 'Shounen Ai' },
    { id: '43', value: 'slice-of-life', label: 'Slice Of Life' },
    { id: '58', value: 'yaoi', label: 'Yaoi' },
    { id: '45', value: 'soft-yaoi', label: 'Soft Yaoi' },
    { id: '59', value: 'yuri', label: 'Yuri' },
    { id: '46', value: 'soft-yuri', label: 'Soft Yuri' },
    { id: '47', value: 'sports', label: 'Sports' },
    { id: '48', value: 'supernatural', label: 'Supernatural' },
    { id: '44', value: 'smut', label: 'Smut' },
    { id: '49', value: 'tap-chi-truyen-tranh', label: 'Tạp chí truyện tranh' },
    { id: '50', value: 'thieu-nhi', label: 'Thiếu nhi' },
    { id: '51', value: 'tragedy-136', label: 'Tragedy' },
    { id: '52', value: 'trinh-tham', label: 'Trinh thám' },
    { id: '54', value: 'truyen-scan', label: 'Truyện Scan' },
    { id: '53', value: 'truyen-mau', label: 'Truyện màu' },
    { id: '55', value: 'viet-nam', label: 'Việt Nam' },
    { id: '56', value: 'webtoon', label: 'Webtoon' },
    { id: '57', value: 'xuyen-khong-205', label: 'Xuyên không' },
    { id: '60', value: '16', label: '16+' },
    { id: '2', value: 'truong-thanh', label: 'Trưởng thành' },
];

export const VIEW_NT = [
    { value: 'all', label: 'Tất cả' },
    { value: 'month', label: 'View Tháng' },
    { value: 'week', label: 'View Tuần' },
    { value: 'day', label: 'View Ngày' },
    { value: 'new', label: 'Mới ra' },
    { value: 'newComic', label: 'Chapter mới' },
];

export const STATUS_NT = [
    { value: 'all', label: 'Tất cả' },
    { value: 'ongoing', label: 'Đang tiến hành' },
    { value: 'completed', label: 'Hoàn thành' },
];

export const COMIC_GENRES = [
    { id: '23', value: 'manga-112', label: 'Manga' },
    { id: '24', value: 'manhua', label: 'Manhua' },
    { id: '25', value: 'manhwa-11400', label: 'Manhwa' },
    { id: '10', value: 'doujinshi', label: 'Doujinshi' },
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

export const MANGA_RESOURCE: MangaResource[] = [];

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
