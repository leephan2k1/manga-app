export type sources =
    | 'nettruyen'
    | 'lhmanga'
    | 'truyenqq'
    | 'mangadex'
    | 'mangareader';

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
