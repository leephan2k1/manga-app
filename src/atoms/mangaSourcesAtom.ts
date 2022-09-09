import { atom } from 'jotai';
import { MangaResource } from '~/types';
import { MANGA_RESOURCE } from '~/constants';

export const mangaSources = atom(MANGA_RESOURCE as MangaResource[]);
