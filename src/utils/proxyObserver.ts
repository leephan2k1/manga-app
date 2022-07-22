export default function proxyObserver(srcId?: string) {
    switch (srcId) {
        case 'nt':
            return true;
        case 'lh':
            return false;
        default:
            return true;
    }
}
