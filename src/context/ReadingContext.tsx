import { createContext, ReactNode, useContext } from 'react';
import { Chapter, ImagesChapter, SourcesId, NavigateDirection } from '~/types';

interface ReadingContextType {
    images: ImagesChapter[];
    currentChapter: Chapter | undefined;
    useProxy?: boolean;
    sourceId: SourcesId;
    navigateChapter: (type: NavigateDirection) => void;
}

interface ReadingContextProps {
    children: ReactNode;
    value: ReadingContextType;
}

const ReadingContext = createContext<ReadingContextType | null>(null);

export const ReadingContextProvider = ({
    children,
    value,
}: ReadingContextProps) => {
    return (
        <ReadingContext.Provider value={value}>
            {children}
        </ReadingContext.Provider>
    );
};

export default function useReading() {
    return useContext(ReadingContext);
}
