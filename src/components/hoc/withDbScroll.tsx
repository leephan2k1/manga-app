import { ComponentType, FunctionComponent, ReactNode } from 'react';
import { useEventListener } from 'usehooks-ts';

type WithDbScroll<P> = FunctionComponent<P> & {
    getLayout?: (page: ReactNode) => ReactNode;
};

export default function withDbScroll<P>(
    WrappedComponent: ComponentType<P>,
): WithDbScroll<P> {
    const ComponentWidthDoubleScrollToTop = (props: P) => {
        const handleDbClick = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        };

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEventListener('dblclick', handleDbClick);
        return <WrappedComponent {...props} />;
    };

    return ComponentWidthDoubleScrollToTop;
}

/* ref article:
https://maxrozen.com/implement-higher-order-component-react-typescript

https://stackoverflow.com/questions/70598217/per-page-layout-for-pages-wrapped-with-hoc-using-typescript

https://github.com/vercel/next.js/discussions/33468
*/
