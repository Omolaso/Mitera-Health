/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./utils/**/*.{js,ts,jsx,tsx,mdx}",
		"./views/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				lightGreen: "#c4f6ed",
				grey: "#f4f4f4",
				deepGrey: "#c4c4c4",
				pink: "#fd918d",
				blue: "#099AA8",
				royalGreen: "#649b73",
				green: "#42bda5",
			},
		},
	},
	plugins: [],
};
