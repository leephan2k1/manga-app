export const randomColors = (
    arrayColors: Array<string>,
    currentIdx: number,
) => {
    return arrayColors[currentIdx % arrayColors.length];
};
