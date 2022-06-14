import { MouseEvent, useEffect, useState } from 'react';
import PageInput from '../shared/PageInput';
import usePushQuery from '~/hooks/usePushQuery';
import { useRouter } from 'next/router';

interface PaginationProps {
    totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
    const [query] = usePushQuery();
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);

    const handleChangePage = (e: MouseEvent<HTMLLIElement>) => {
        setCurrentPage(Number(e.currentTarget.dataset.id));
        query.push('page', String(e.currentTarget.dataset.id));
    };

    const handleInputPage = (page: number) => {
        if (page > totalPages) {
            setCurrentPage(totalPages);
            query.push('page', String(totalPages));
            return;
        }

        if (page < 1) {
            setCurrentPage(1);
            query.push('page', String(1));
            return;
        }

        setCurrentPage(page);
        query.push('page', String(page));
    };

    useEffect(() => {
        const { page } = router.query;
        setCurrentPage(page ? parseInt(String(page)) : 1);
    }, [router.query]);

    return (
        <div className="absolute-center min-h-[50px] w-full bg-cyan-400/0">
            <ul className="flex h-full w-full flex-wrap items-center justify-center gap-4 text-3xl text-white">
                <li
                    onClick={handleChangePage}
                    data-id={1}
                    className={`pagination-active rounded-lg ${
                        currentPage === 1
                            ? 'bg-primary hover:bg-primary/60'
                            : 'bg-highlight hover:bg-highlight/25'
                    } py-4 px-7 font-secondary  transition-all hover:cursor-pointer `}
                >
                    1
                </li>

                {currentPage > 4 && (
                    <PageInput
                        setCurrentPage={handleInputPage}
                        totalPages={totalPages}
                    />
                )}

                {[
                    currentPage - 2,
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    currentPage + 2,
                ].map((number) => {
                    if (number > 1 && number < totalPages)
                        return (
                            <li
                                key={number}
                                onClick={handleChangePage}
                                data-id={number}
                                className={`pagination-active rounded-lg ${
                                    number === currentPage
                                        ? 'bg-primary hover:bg-primary/60'
                                        : 'bg-highlight hover:bg-highlight/25'
                                } py-4 px-7 font-secondary  transition-all hover:cursor-pointer hover:bg-highlight/25`}
                            >
                                {number}
                            </li>
                        );
                })}

                {totalPages - currentPage > 3 && (
                    <PageInput
                        setCurrentPage={handleInputPage}
                        totalPages={totalPages}
                    />
                )}

                <li
                    onClick={handleChangePage}
                    data-id={totalPages}
                    className={`pagination-active rounded-lg ${
                        currentPage === totalPages
                            ? 'bg-primary hover:bg-primary/60'
                            : 'bg-highlight hover:bg-highlight/25'
                    } py-4 px-7 font-secondary  transition-all hover:cursor-pointer hover:bg-highlight/25`}
                >
                    {totalPages}
                </li>
            </ul>
        </div>
    );
}
