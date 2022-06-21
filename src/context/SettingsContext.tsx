import { createContext, ReactNode, useContext, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { ImageMode, ReadDirection, ReadMode, ReadModeSettings } from '~/types';

interface SettingsContextProps {
    children: ReactNode;
}

interface SettingsContextType {
    show: boolean;
    readMode: ReadMode;
    readDirection: ReadDirection;
    imageMode: ImageMode;
    toggleSettings: () => void;
    turnOffSettings: () => void;
    turnOnSettings: () => void;
    setReadDirection: (drt: ReadDirection) => void;
    setImageMode: (mode: ImageMode) => void;
    setReadMode: (mode: ReadMode) => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsContextProvider = ({ children }: SettingsContextProps) => {
    const [savedSettings, setSettingsLc] = useLocalStorage<ReadModeSettings>(
        'settings',
        { readDirection: 'rtl', readMode: 'vertical' },
    );
    const [showSettings, setShowSettings] = useState(false);
    const [imageMode, setImageMode] = useState<ImageMode>('full');
    const [readMode, setReadMode] = useState<ReadMode>(
        savedSettings?.readMode || 'vertical',
    );
    const [readDrt, setReadDrt] = useState<ReadDirection>(
        savedSettings?.readDirection || 'rtl',
    );

    const turnOffSettings = () => {
        setShowSettings(false);
    };

    const turnOnSettings = () => {
        setShowSettings(true);
    };

    const toggleSettings = () => {
        setShowSettings((prevState) => !prevState);
    };

    const handleImageMode = (mode: ImageMode) => {
        setImageMode(mode);
    };

    const handleSetReadMode = (mode: ReadMode) => {
        setReadMode(mode);

        setSettingsLc(() => {
            return { readDirection: readDrt || 'rtl', readMode: mode };
        });
    };

    const handleSetDirection = (direction: ReadDirection) => {
        setReadDrt(direction);

        setSettingsLc(() => {
            return {
                readMode: readMode || 'vertical',
                readDirection: direction,
            };
        });
    };

    const values = {
        show: showSettings,
        imageMode,
        readMode,
        readDirection: readDrt,
        turnOffSettings,
        turnOnSettings,
        toggleSettings,
        setImageMode: handleImageMode,
        setReadMode: handleSetReadMode,
        setReadDirection: handleSetDirection,
    } as const;

    return (
        <SettingsContext.Provider value={values}>
            {children}
        </SettingsContext.Provider>
    );
};

export default function useSettingsMode() {
    return useContext(SettingsContext);
}
