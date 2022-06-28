import { atom } from 'recoil';
import { HeadlessManga } from '~/types';

export const chapterList = atom({
    key: 'chapterListAtom',
    default: {
        title: '',
        mangaSlug: '',
        chapterList: [],
    } as HeadlessManga,
});
