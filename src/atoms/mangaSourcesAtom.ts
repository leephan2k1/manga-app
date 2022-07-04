import { atom } from 'recoil';
import { MangaResource } from '~/types';
import { MANGA_RESOURCE } from '~/constants';

export const mangaSources = atom({
    key: 'mangaSources',
    default: MANGA_RESOURCE as MangaResource[],
});
