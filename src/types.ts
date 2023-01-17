export interface Owner {
    _id: string;
    name: string;
    image: string;
}

export interface Reactions {
    clown_face: string[];
    thumbs_up: string[];
    heart: string[];
    enraged_face: string[];
}

export interface Author {
    _id: string;
    name: string;
    __v: number;
    avatar: string;
    birthday: string;
    description: string;
    jp_alternative_name: string;
    jp_name: string;
    sc_instagram_link: string;
    sc_pixiv_link: string;
    sc_twitter_link: string;
}

export interface Comment {
    reactions: Reactions;
    _id: string;
    comicSlug: string;
    comicName: string;
    section: string;
    contents: string;
    owner: Owner;
    isSpoil?: boolean;
    replies: Comment[];
    totalReactions: number;
    createdAt: Date;
    updatedAt: Date;
    lastEdited?: Date;
    replyTo?: string;
}

export interface Notification {
    _id: string;
    owner: Pick<Owner, 'image' | 'name'>;
    comment: Pick<
        Comment,
        '_id' | 'comicSlug' | 'comicName' | 'section'
    > | null;
    response: Pick<Owner, 'image' | 'name'>;
    createdAt: Date;
    updatedAt: Date;
    seen?: Date;
}

export type sources =
    | 'nettruyen'
    | 'lhmanga'
    | 'truyenqq'
    | 'mangadex'
    | 'mangareader';

export interface Subscription {
    endpoint: string;
    keys: {
        p256dh: string;
        auth: string;
    };
}

export interface SelectType {
    value: string;
    label: string;
}

export interface ImgRatio {
    index: number;
    ratio: number;
}

export type ImageMode = 'full' | 'fitW' | 'fitH';

export type ReadMode = 'vertical' | 'horizontal';

export type ReadDirection = 'rtl' | 'ltr';

export type NavigateDirection = 'next' | 'prev';

export type NextDirection = 'right' | 'left';

export interface ComicFollowed {
    _id: string;
    mangaSlug: string;
    userId: string;
    createAt: Date;
    source: string;
    status: string;
}

export type FollowState =
    | 'reading'
    | 'on-hold'
    | 'dropped'
    | 'plan-to-read'
    | 'completed'
    | 're-reading';

export interface ReadModeSettings {
    readMode: ReadMode;
    readDirection: ReadDirection;
    nextDirection: NextDirection;
    autoNext?: boolean;
}

export type SourcesId = 'NTC' | 'LHM' | 'OTK';

export interface MangaResource {
    sourceName: string;
    sourceId: SourcesId;
}

export type Status = 'Đang tiến hành' | 'Hoàn thành';

export type NETTRUYEN_GENRES =
    | 'action'
    | 'truong-thanh'
    | 'adventure'
    | 'anime'
    | 'chuyen-sinh-213'
    | 'comedy-99'
    | 'comic'
    | 'cooking'
    | 'co-dai-207'
    | 'doujinshi'
    | 'drama-103'
    | 'dam-my'
    | 'ecchi'
    | 'fantasy-105'
    | 'gender-bender'
    | 'harem-107'
    | 'historical'
    | 'horror'
    | 'josei'
    | 'live-action'
    | 'manga-112'
    | 'manhua'
    | 'manhwa-11400'
    | 'martial-arts'
    | 'mature'
    | 'mecha-117'
    | 'mystery'
    | 'ngon-tinh'
    | 'one-shot'
    | 'psychological'
    | 'romance-121'
    | 'school-life'
    | 'sci-fi'
    | 'seinen'
    | 'shoujo'
    | 'shoujo-ai-126'
    | 'shounen-127'
    | 'shounen-ai'
    | 'slice-of-life'
    | 'smut'
    | 'soft-yaoi'
    | 'soft-yuri'
    | 'sports'
    | 'supernatural'
    | 'tap-chi-truyen-tranh'
    | 'thieu-nhi'
    | 'tragedy-136'
    | 'trinh-tham'
    | 'truyen-scan'
    | 'truyen-mau'
    | 'viet-nam'
    | 'webtoon'
    | 'xuyen-khong-205'
    | '16';

export interface ServerResponse {
    success: boolean;
    totalPages: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
}

export interface NtSearchResponseData {
    thumbnail: string;
    name: string;
    slug: string;
    newChapter: string;
    genres: string[];
}

export interface Manga extends NtSearchResponseData {
    status: Status;
    author: string;
    otherName: string;
    review: string;
    updatedAt: string;
    chapters?: Chapter[];
}
// -> obsolescent
export interface MangaDetails {
    title: string;
    updatedAt: string;
    otherName: string;
    author: string;
    thumbnail: string;
    status: string;
    genres: Genre[];
    view: string;
    review: string;
    chapterList: Chapter[];
}

export type HeadlessManga = Pick<MangaDetails, 'chapterList' | 'title'> & {
    mangaSlug: string;
    isWebtoon?: boolean;
};

export interface Chapter {
    chapterId: string;
    chapterNumber: string;
    chapterTitle: string;
    chapterSlug?: string;
    updatedAt: string;
    view: string;
    _id?: string;
}

export interface Genre {
    genreTitle: string;
    slug: string;
}

export interface LHSearchRes {
    success: boolean;
    data: DataLHSearchRes;
}

export interface DataLHSearchRes {
    status: number;
    success: boolean;
    data: LHMangaSearch[];
}

export interface LHMangaSearch {
    id: number;
    name: string;
    cover_url: string;
    pilot: string;
    url: string;
}

export interface ImagesChapter {
    id: string;
    imgSrc: string;
    imgSrcCDN?: string;
}

export interface Page_Image {
    id: string;
    src: string;
    fallbackSrc?: string;
}

export interface Page extends Page_Image {
    _id: string;
}

export interface ChapterDetails {
    _id: string;
    comicName: string;
    comicSlug: string;
    source: string;
    chapters_list: { _id: string; sourceName: string; chapters: Chapter[] }[];
}

export interface PageInfo {
    _id: string;
    chapterSlug: string;
    comicName: string;
    comicSlug: string;
    pages: Page[];
    source: string;
}

export interface Comic {
    _id: string;
    name: string;
    __v: number;
    author: string;
    custom_id: number;
    genres: Genre[];
    chapters?: ChapterDetails; // -> fallback comic hasn't chapters
    description?: Description; // -> fallback comic hasn't description
    newChapter: string;
    otherName: string;
    review: string;
    slug: string;
    sourcesAvailable: SourcesAvailable[];
    status: string;
    thumbnail: string;
    updatedAt: string;
    votes?: string[];
}

export interface Genre {
    id: string;
    value: string;
    label: string;
    _id: string;
}

export interface Character {
    _id: string;
    cover: string;
    mal_url: string;
    name: string;
    role: string;
}

export interface DescPicture {
    large: string;
    small: string;
    _id: string;
}

export interface Description {
    _id: string;
    name: string;
    characters: Character[];
    titles: {
        title_synonyms: string;
        title_japanese: string;
        title_english: string;
    };
    cover: string;
    description: string;
    mal_id: string;
    popularity: string;
    published: string;
    ranked: string;
    score: string;
    slug: string;
    pictures: DescPicture[];
}

export interface SourcesAvailable {
    sourceName: string;
    sourceSlug: string;
    _id: string;
}

export type ViewSelection =
    | 'Chapters'
    | 'Characters'
    | 'Details'
    | 'Pictures'
    | 'Recommendations';
