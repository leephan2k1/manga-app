import classNames from 'classnames';
import { forwardRef, ReactNode } from 'react';

import { ChevronRightIcon } from '@heroicons/react/outline';
import Link from 'next/link';

interface SectionProps {
    title?: string;
    style?: string;
    children?: ReactNode;
    linkHints?: boolean;
    link?: string;
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
    ({ children, title, style, linkHints, link }, ref) => {
        return (
            <section ref={ref} className={classNames(style)}>
                {title && (
                    <h2 className="mt-4 flex select-none items-center font-secondary text-3xl text-white hover:cursor-pointer hover:text-primary md:text-4xl lg:text-5xl">
                        {!link ? (
                            title
                        ) : (
                            <Link href={link}>
                                <a>{title}</a>
                            </Link>
                        )}
                        {linkHints && (
                            <ChevronRightIcon className="h-8 w-8 lg:h-10 lg:w-10" />
                        )}
                    </h2>
                )}
                {children}
            </section>
        );
    },
);

Section.displayName = 'Section';

export default Section;
