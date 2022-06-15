import { atom } from 'recoil';
import { ChapterList } from '~/types';

export const chapterList = atom({
    key: 'chapterListAtom',
    default: [] as ChapterList[],
});
