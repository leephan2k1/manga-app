export function calculateSeason() {
    const month = new Date().getMonth();

    if (month >= 4 && month <= 6) return 'Xuân';
    else if (month >= 7 && month <= 9) return 'Hạ';
    else if (month >= 10 && month <= 12) return 'Thu';
    else if (month >= 1 && month <= 3) return 'Đông';
}
