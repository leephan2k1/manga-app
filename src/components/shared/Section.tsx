import classNames from 'classnames';
import { forwardRef, ReactNode } from 'react';

interface SectionProps {
    title?: string;
    style?: string;
    children?: ReactNode;
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
    ({ children, title, style }, ref) => {
        return (
            <section ref={ref} className={classNames(style)}>
                {title && (
                    <h2 className="mt-4 ml-6 font-secondary text-3xl text-white md:text-4xl lg:ml-0  lg:text-5xl">
                        {title}
                    </h2>
                )}
                {children}
            </section>
        );
    },
);

Section.displayName = 'Section';

export default Section;
