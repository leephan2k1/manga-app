import { ImageMode, ReadMode } from '~/types';

export default function convertMode(mode: ImageMode | ReadMode) {
    switch (mode) {
        case 'fitH':
            return 'fit height';
        case 'fitW':
            return 'fit width';
        case 'vertical':
            return 'dọc';
        case 'horizontal':
            return 'ngang';
        case 'full':
            return 'full';
    }
}
