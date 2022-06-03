export type sources =
    | 'nettruyen'
    | 'lhmanga'
    | 'truyenqq'
    | 'mangadex'
    | 'mangareader';

export type Status = 'Đang tiến hành' | 'Hoàn thành';

export interface NtSearchResponse {
    success: boolean;
    data: NtSearchResponseData[];
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
