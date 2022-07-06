import axios from 'axios';
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useRecoilState } from 'recoil';
import useSWR from 'swr';
import { mangaSources } from '~/atoms/mangaSourcesAtom';
import { COMPARISON_CHAPTERS_FACTOR } from '~/constants';
import axiosClient from '~/services/axiosClient';
import { LHSearchRes, MangaDetails, SourcesId } from '~/types';

interface SourcesContextProps {
    children: ReactNode;
    comicTitle: string;
}

interface MangaSource {
    srcId: SourcesId;
    slug: string;
    details: MangaDetails;
}

interface SourcesContextType {
    sources: MangaSource[];
}

const SourcesContext = createContext<SourcesContextType | null>(null);

export const SourcesContextProvider = ({
    children,
    comicTitle,
}: SourcesContextProps) => {
    const [sources, setSources] = useState<MangaSource[]>([]);
    const [_, setAvailableSource] = useRecoilState(mangaSources);

    const { data: NTSearch } = useSWR(`/nt/search`, async (slug) => {
        return await (
            await axiosClient.get(slug, { params: { q: comicTitle } })
        ).data;
    });
    const { data: LHSearch } = useSWR<LHSearchRes>(
        `/api/search/lh?title=${comicTitle}`,
        async (slug) => {
            return await (
                await axios.get(slug)
            ).data;
        },
    );

    const { data: LHManga } = useSWR<MangaDetails>(
        LHSearch
            ? `/lh/manga/${LHSearch?.data?.data[0].url?.slice(
                  LHSearch?.data?.data[0].url.lastIndexOf('/'),
              )}`
            : null,
        async (slug) => {
            const res = await (await axiosClient.get(slug))?.data;

            return res.data;
        },
    );
    const { data: NTManga } = useSWR<MangaDetails>(
        NTSearch ? `/nt/manga/${NTSearch?.data[0].slug}` : null,
        async (slug) => {
            const res = await (await axiosClient.get(slug))?.data;

            return res.data;
        },
    );

    /* It's checking if the LHManga has a chapterList, if it does, it will set the availableSource to the LHManga. */
    useEffect(() => {
        if (
            LHManga?.chapterList?.length &&
            NTManga &&
            Math.abs(
                NTManga?.chapterList?.length - LHManga?.chapterList?.length,
            ) < COMPARISON_CHAPTERS_FACTOR
        ) {
            setSources((prevState) => {
                if (prevState.find((src) => src.srcId === 'lh'))
                    return prevState;

                return [
                    ...prevState,
                    {
                        srcId: 'lh',
                        slug: LHSearch?.data?.data[0].url?.slice(
                            LHSearch?.data?.data[0].url.lastIndexOf('/') + 1,
                        ) as string,
                        details: LHManga,
                    },
                ];
            });

            setAvailableSource((prevState) => {
                if (prevState.find((src) => src.sourceName === 'LHM'))
                    return prevState;

                return [
                    ...prevState,
                    {
                        sourceName: 'LHM',
                        sourceId: 'lh',
                    },
                ];
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [LHManga, NTManga]);

    /* It's checking if the NTManga has a chapterList, if it does, it will set the availableSource to the NTManga. */
    useEffect(() => {
        if (NTManga?.chapterList.length) {
            setSources((prevState) => {
                if (prevState.find((src) => src.srcId === 'nt'))
                    return prevState;

                return [
                    ...prevState,
                    {
                        srcId: 'nt',
                        slug: NTSearch.data[0].slug,
                        details: NTManga,
                    },
                ];
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [NTManga]);

    const value = {
        sources,
    } as const;

    return (
        <SourcesContext.Provider value={value}>
            {children}
        </SourcesContext.Provider>
    );
};

export default function useMultipleSources() {
    return useContext(SourcesContext);
}
