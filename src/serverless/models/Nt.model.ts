import { AxiosRequestConfig } from 'axios';
import { parse } from 'node-html-parser';

import Scraper from '../libs/Scraper';
import { normalizeString } from '../utils/stringHandler';

export default class NtModel extends Scraper {
    private static instance: NtModel;

    private constructor(
        baseUrl: string,
        axiosConfig?: AxiosRequestConfig,
        timeout?: number,
    ) {
        super(baseUrl, axiosConfig, timeout);
    }

    public static getInstance(
        baseUrl: string,
        axiosConfig?: AxiosRequestConfig,
        timeout?: number,
    ) {
        if (!this.instance) {
            this.instance = new this(baseUrl, axiosConfig, timeout);
        }

        return this.instance;
    }

    private parseChapters(chapters: HTMLElement[]) {
        return [...chapters].map((chapter) => {
            const chapterTitle = normalizeString(
                String(chapter.querySelector('a')?.textContent),
            );
            const chapterId = chapter
                .querySelector('a')
                ?.getAttribute('data-id');

            const arr = String(
                chapter.querySelector('a')?.getAttribute('href'),
            ).split('/');

            const chapterStr = arr[arr.length - 2];

            const chapterNumber = chapterStr.slice(chapterStr.indexOf('-') + 1);

            const updatedAt = normalizeString(
                String(chapter.querySelectorAll('div')[1].textContent),
            );

            const view = normalizeString(
                String(chapter.querySelectorAll('div')[2].textContent),
            );

            return {
                chapterId,
                chapterNumber,
                chapterTitle,
                updatedAt,
                view,
            };
        });
    }

    public async getComic(mangaSlug: string, limit?: number) {
        const baseUrlMangaDetail = 'truyen-tranh';

        try {
            const { data } = await this.client.get(
                `${this.baseUrl}/${baseUrlMangaDetail}/${mangaSlug}`,
            );
            const document = parse(data);

            const rootSelector = '#item-detail';

            const title = normalizeString(
                String(
                    document.querySelector(`${rootSelector} h1`)?.textContent,
                ),
            );

            const updatedAt = normalizeString(
                String(
                    document.querySelector(`${rootSelector} time`)?.textContent,
                ),
            );

            const otherName = normalizeString(
                String(
                    document.querySelector(
                        `${rootSelector} .detail-info .other-name`,
                    )?.textContent,
                ),
            );

            const author = normalizeString(
                String(
                    document.querySelectorAll(
                        `${rootSelector} .detail-info .author p`,
                    )[1].textContent,
                ),
            );

            const status = normalizeString(
                String(
                    document.querySelectorAll(
                        `${rootSelector} .detail-info .status p`,
                    )[1].textContent,
                ),
            );

            const genresArrayRaw = document
                .querySelectorAll(`${rootSelector} .kind p`)[1]
                .querySelectorAll('a');
            const genres = [...genresArrayRaw].map((genre) => {
                const genreTitle = normalizeString(String(genre.textContent));
                const hrefString = String(genre.getAttribute('href'));
                const slug = hrefString.substring(
                    hrefString.lastIndexOf('/') + 1,
                );

                return { genreTitle, slug };
            });

            const lastChildUl = document.querySelectorAll(
                `${rootSelector} .detail-info .list-info .row`,
            );

            const view = normalizeString(
                String(
                    lastChildUl[lastChildUl.length - 1].querySelectorAll('p')[1]
                        .textContent,
                ),
            );

            const review = normalizeString(
                String(
                    document.querySelector(`${rootSelector} .detail-content p`)
                        ?.textContent,
                ),
            );

            const chapterListRaw = document.querySelectorAll(
                `${rootSelector} #nt_listchapter ul .row`,
            );

            let chapterList:
                | {
                      chapterId: string | undefined;
                      chapterNumber: string;
                      chapterTitle: string;
                      updatedAt: string;
                      view: string;
                  }
                | undefined;
            [];

            if (limit && limit > 0) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                chapterList = this.parseChapters(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    [...chapterListRaw].reverse().slice(0, limit),
                );
            } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                chapterList = this.parseChapters(chapterListRaw);
            }

            const thumbnail = super.unshiftProtocol(
                String(
                    document
                        .querySelector(`${rootSelector} .col-image img`)
                        ?.getAttribute('src'),
                ),
            );

            return {
                title,
                updatedAt,
                thumbnail,
                otherName,
                author,
                status,
                genres,
                view,
                review,
                chapterList,
            };
        } catch (error) {
            // console.log(error);
            return {
                title: '',
                updatedAt: '',
                otherName: '',
                author: '',
                status: '',
                genres: '',
                view: '',
                review: '',
                chapterList: '',
            };
        }
    }
}
