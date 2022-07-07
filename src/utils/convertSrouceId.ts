export default function convertIdToLabel(src: string) {
    switch (src) {
        case 'lh':
            return 'LHM';
        case 'nt':
            return 'NTC';
        default:
            return '';
    }
}
