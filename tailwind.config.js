module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                background: '1f1f1f',
                primary: '#6366f1',
                secondary: '2f2f2f',
            },
            listStyleType: {
                circle: 'circle',
            },
        },
        fontFamily: {
            primary: 'Nunito, sans-serif',
            secondary: 'League Spartan, sans-serif',
        },
    },

    plugins: [require('@tailwindcss/line-clamp')],
};
