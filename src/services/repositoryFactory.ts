import { sources } from '~/types';

import NettruyenRepository from './nettruyenRepository';

export default function RepositoryFactory(name: sources) {
    switch (name) {
        case 'nettruyen':
            return NettruyenRepository;
        default:
            return null;
    }
}
