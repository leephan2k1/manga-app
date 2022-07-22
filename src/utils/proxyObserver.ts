export default function proxyObserver(srcId?: string) {
    switch (srcId) {
        case 'nt':
            return false;
        case 'lh':
            return false;
        default:
            return true;
    }
}
