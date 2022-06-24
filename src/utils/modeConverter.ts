import { ImageMode, ReadMode, ReadDirection, NextDirection } from '~/types';

export default function convertMode(
    mode: ImageMode | ReadMode | ReadDirection | NextDirection,
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
        case 'right':
            return 'cạnh phải';
        case 'left':
            return 'cạnh trái';
    }
}
