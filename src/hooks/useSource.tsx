import { useRecoilValue } from 'recoil';
import { mangaSrc } from '~/atoms/mangaSrcAtom';
import { MANGA_RESOURCE, DEFAULT_SRC } from '~/constants';

export default function useSource() {
    const srcId = useRecoilValue(mangaSrc) || DEFAULT_SRC;
    const srcName =
        MANGA_RESOURCE.find((src) => src.sourceId === srcId)?.sourceName ||
        MANGA_RESOURCE[0].sourceName;

    return [srcId, srcName];
}
