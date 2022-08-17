export default function proxyObserver(srcId?: string) {
    switch (srcId) {
        case 'LHM':
            return false;
        default:
            return true;
    }
}
