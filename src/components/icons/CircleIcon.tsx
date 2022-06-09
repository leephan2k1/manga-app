interface CircleIconProps {
    wraperStyles?: string;
    circleStyles?: string;
}

export default function CircleIcon({
    wraperStyles,
    circleStyles,
}: CircleIconProps) {
    return (
        <svg className={wraperStyles} viewBox="25 25 50 50">
            <circle className={circleStyles} cx="50" cy="50" r="20"></circle>
        </svg>
    );
}
