import { AxiosRequestConfig } from 'axios';
import { parse } from 'node-html-parser';

import Scraper from '../libs/Scraper';

export default class LhModel extends Scraper {
    private static instance: LhModel;

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

    public async search(title: string) {
        try {
            const { data } = await this.client.get(
                `${this.baseUrl}/action/search`,
                {
                    params: {
                        q: title,
                    },
                },
            );

            return data;
        } catch (err) {
            return null;
        }
    }

    private parseChapters(chapters: HTMLElement[]) {
        return [...chapters].map((item) => {
            const chapterId = item
                .getAttribute('href')
                ?.slice(
                    String(item.getAttribute('href'))?.lastIndexOf('/') + 1,
                );

            const chapterTitle = item
                ?.querySelector('.chapter-name')
                ?.textContent?.trim();

            const updatedAt = item?.querySelector('.chapter-time')?.textContent;

            return {
                chapterId,
                chapterNumber: chapterId
                    ?.slice(0, chapterId.lastIndexOf('-'))
                    .replace(/^\D+/g, ''),
                chapterTitle,
                updatedAt,
                view: 'updating',
            };
        });
    }

    public async getComic(slug: string, limit?: number) {
        try {
            const { data } = await this.client.get(
                `${this.baseUrl}/truyen-tranh/${slug}`,
            );

            const document = parse(data);

            const title = document
                ?.querySelector('.series-name')
                ?.textContent.trim();

            const updatedAt = document
                ?.querySelector('.statistic-value .timeago')
                ?.textContent.trim();

            const infoItems = document?.querySelectorAll('.info-item');

            let otherName = '';
            let author = '';
            let status = '';
            let genres:
                | { slug: string | undefined; genreTitle: string | undefined }[]
                | null = null;

            infoItems.forEach((item) => {
                switch (item.querySelector('.info-name')?.textContent.trim()) {
                    case 'Tên khác:':
                        otherName = item
                            .querySelector('.info-value')
                            ?.textContent.trim() as string;
                        break;
                    case 'Tác giả:':
                        author = item
                            .querySelector('.info-value')
                            ?.textContent.trim() as string;
                        break;
                    case 'Tình trạng:':
                        status = item
                            .querySelector('.info-value')
                            ?.textContent.trim() as string;
                        break;
                    case 'Thể loại:':
                        genres = item
                            .querySelectorAll('.info-value a')
                            .map((i) => {
                                return {
                                    slug: i
                                        .getAttribute('href')
                                        ?.slice(
                                            String(
                                                i.getAttribute('href'),
                                            )?.lastIndexOf('/') + 1,
                                        ),
                                    genreTitle: i
                                        .querySelector('span')
                                        ?.textContent.trim(),
                                };
                            });
                        break;
                }
            });

            const thumbnailRaw = String(
                document
                    ?.querySelector('.series-cover .img-in-ratio')
                    ?.getAttribute('style'),
            )?.match(/\((.*?)\)/);
            const thumbnail =
                thumbnailRaw && thumbnailRaw[1]?.replace(/('|")/g, '');

            const view =
                document?.querySelectorAll('.statistic-value')[2].textContent;

            const review =
                document?.querySelector('.summary-content')?.textContent;

            let chapterList:
                | {
                      chapterId: string | undefined;
                      chapterNumber: string | undefined;
                      chapterTitle: string | undefined;
                      updatedAt: string | undefined;
                      view: string;
                  }[]
                | undefined;

            if (limit && limit > 0) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                chapterList = this.parseChapters(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    Array.from(
                        document
                            ?.querySelectorAll('.list-chapters a')
                            .reverse()
                            .slice(0, limit),
                    ),
                );
            } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                chapterList = this.parseChapters(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    Array.from(document?.querySelectorAll('.list-chapters a')),
                );
            }

            return {
                title,
                updatedAt,
                otherName,
                thumbnail,
                author,
                status,
                genres,
                view,
                review,
                chapterList,
            };
        } catch (err) {
            console.log('LH model error:::', err);
            return null;
        }
    }
}
