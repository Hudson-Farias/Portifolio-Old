import withMT from "@material-tailwind/react/utils/withMT"
import colors from 'tailwindcss/colors'

const config = withMT({
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {...colors},
    }
  },
  plugins: [],
})
export default config
