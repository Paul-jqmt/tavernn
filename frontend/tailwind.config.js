/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    deep_purple: "#2d2769",
                    mid_purple: "#3d348b",
                    light_purple: "#7678ed",
                    deep_orange: "#f35b04",
                    mid_orange: "#f27103",
                    light_orange: "#f4a001",
                    white: "#eeeeee",
                    grey: "#787878",
                    red: "#f30404",
                }
            },
            fontFamily: {
                geologica: ['Geologica', 'sans-serif'],
            },
        },
    },
    plugins: [],
}