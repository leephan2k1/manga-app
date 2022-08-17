import { atom } from 'recoil';
import { SourcesId } from '~/types';

export const mangaSrc = atom({
    key: 'mangaSource',
    default: 'NTC' as SourcesId,
});
