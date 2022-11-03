export function calculateSeason() {
    const month = new Date().getMonth() + 1;

    if (month >= 4 && month <= 6) return 'Xuân';
    else if (month >= 7 && month <= 9) return 'Hạ';
    else if (month >= 10 && month <= 12) return 'Thu';
    else if (month >= 1 && month <= 3) return 'Đông';
}

export function calculateDiffDate(target: Date) {
    // seconds
    const diff = Math.ceil(
        (new Date(Date.now()).getTime() - new Date(target).getTime()) / 1000,
    );

    if (diff < 60) {
        return `${diff} giây trước`;
    }

    if (Math.ceil(diff / 60) < 60) {
        return `${Math.ceil(diff / 60)} phút trước`;
    }

    if (Math.ceil(diff / 60 / 60) < 24) {
        return `${Math.ceil(diff / 60 / 60)} giờ trước`;
    }

    if (Math.ceil(diff / 60 / 60 / 24) < 31) {
        return `${Math.ceil(diff / 60 / 60 / 24)} ngày trước`;
    }

    if (Math.ceil(diff / 60 / 60 / 24 / 31) < 12) {
        return `${Math.ceil(diff / 60 / 60 / 24 / 31)} tháng trước`;
    }

    return `${Math.ceil(diff / 60 / 60 / 24 / 31 / 12)} năm  trước`;
}
