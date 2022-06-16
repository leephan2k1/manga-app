import { ImageMode } from '~/types';
import { createContext, ReactNode, useState, useContext } from 'react';

interface SettingsContextProps {
    children: ReactNode;
}

interface SettingsContextType {
    show: boolean;
    imageMode: ImageMode;
    toggleSettings: () => void;
    turnOffSettings: () => void;
    turnOnSettings: () => void;
    setImageMode: (mode: ImageMode) => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsContextProvider = ({ children }: SettingsContextProps) => {
    const [showSettings, setShowSettings] = useState(false);
    const [imageMode, setImageMode] = useState<ImageMode>('full');

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

    const values = {
        show: showSettings,
        imageMode,
        turnOffSettings,
        turnOnSettings,
        toggleSettings,
        setImageMode: handleImageMode,
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
