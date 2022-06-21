import { ImageMode, ReadMode, ReadDirection } from '~/types';

export default function convertMode(
    mode: ImageMode | ReadMode | ReadDirection,
) {
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
        case 'rtl':
            return 'phải sang trái';
        case 'ltr':
            return 'trái sang phải';
    }
}
