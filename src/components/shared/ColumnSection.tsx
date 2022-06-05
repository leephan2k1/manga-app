interface ColumnSectionProps {
    title?: string;
}

export default function ColumnSection({ title }: ColumnSectionProps) {
    return (
        <div className="h-[800px] w-full bg-secondary">
            {title && (
                <h2 className="my-6 text-center font-secondary text-4xl text-white lg:text-5xl">
                    {title}
                </h2>
            )}
        </div>
    );
}
