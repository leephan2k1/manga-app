import { ChangeEvent, forwardRef, memo } from 'react';

interface SearchInputProps {
    handleOpenButtonClearSearch: () => void;
    setShowBtnClearInput: (state: boolean) => void;
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
    (
        { handleOpenButtonClearSearch, setShowBtnClearInput, handleSearch },
        ref,
    ) => {
        return (
            <input
                ref={ref}
                type="text"
                className="w-full bg-transparent p-4"
                onBlur={handleOpenButtonClearSearch}
                onFocus={() => setShowBtnClearInput(false)}
                onChange={handleSearch}
            />
        );
    },
);

SearchInput.displayName = 'SearchInput';

export default memo(SearchInput);
