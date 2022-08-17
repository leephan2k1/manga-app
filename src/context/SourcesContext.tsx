import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useRecoilValue } from 'recoil';
import { mangaSrc } from '~/atoms/mangaSrcAtom';
import { Chapter, ChapterDetails } from '~/types';

interface SourcesContextProps {
    children: ReactNode;
    value: SourcesContextType;
}

interface SourcesContextType {
    chaptersDetail: ChapterDetails;
    currentChapters?: {
        _id: string;
        sourceName: string;
        chapters: Chapter[];
    };
}

const SourcesContext = createContext<SourcesContextType | null>(null);

export const SourcesContextProvider = ({
    children,
    value,
}: SourcesContextProps) => {
    const [currentChapters, setCurrentChapters] = useState(
        value.currentChapters,
    );
    const src = useRecoilValue(mangaSrc);

    useEffect(() => {
        const matching = value.chaptersDetail.chapters_list.find(
            (e) => e.sourceName === src,
        );

        if (matching) {
            setCurrentChapters(matching);
        }
    }, [src]);

    return (
        <SourcesContext.Provider value={{ ...value, currentChapters }}>
            {children}
        </SourcesContext.Provider>
    );
};

export default function useMultipleSources() {
    return useContext(SourcesContext);
}
