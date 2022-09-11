import { AnimatePresence, motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface ImageWrapperProps {
    children: ReactNode;
}

const variants: Variants = {
    initial: {
        opacity: 0,
    },

    animate: {
        opacity: 1,
        transition: { duration: 0.4 },
    },

    exit: {
        opacity: 0,
    },
};

export default function ImageWrapper({ children }: ImageWrapperProps) {
    return (
        <AnimatePresence exitBeforeEnter>
            <motion.div
                className="full-size relative"
                variants={variants}
                animate="animate"
                exit="exit"
                initial="initial"
                transition={[0.83, 0, 0.17, 1]}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
