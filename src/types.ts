export type sources =
    | 'nettruyen'
    | 'lhmanga'
    | 'truyenqq'
    | 'mangadex'
    | 'mangareader';

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
}
