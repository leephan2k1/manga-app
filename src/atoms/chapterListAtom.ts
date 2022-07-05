import { atom } from 'recoil';
import { HeadlessManga } from '~/types';

//serve cache from details page -> read page
export const chapterList = atom({
    key: 'chapterListAtom',
    default: {
        title: '',
        mangaSlug: '',
        chapterList: [],
    } as HeadlessManga,
});
