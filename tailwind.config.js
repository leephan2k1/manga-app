module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                background: '#1f1f1f',
                primary: '#f43f5e',
                secondary: '#2f2f2f',
            },
            listStyleType: {
                circle: 'circle',
            },
        },
        fontFamily: {
            primary: 'Nunito, sans-serif',
            secondary: 'League Spartan, sans-serif',
            logo: 'SVN-Kashima Brush',
        },
    },

    plugins: [require('@tailwindcss/line-clamp')],
};
