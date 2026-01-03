import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 로컬 Noto 폰트
        sans: ["var(--font-noto-sans-display)", "var(--font-noto-sans-jp)", "sans-serif"],
        serif: ["var(--font-noto-serif-display)", "serif"],
        
        // 개별 폰트 접근
        "noto-sans": ["var(--font-noto-sans-display)", "sans-serif"],
        "noto-serif": ["var(--font-noto-serif-display)", "serif"],
        "noto-jp": ["var(--font-noto-sans-jp)", "sans-serif"],
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          primary: "#1F1F1F",   // 메인 브랜드 컬러
          secondary: "#575757", // 보조 브랜드 컬러
          muted: "#D9D9D9",     // 강조 포인트 컬러
        },
        text: {
          main: "#1F1F1F",      // 기본 텍스트
          sub: "#898989",       // 부가 설명/회색 텍스트
          critical: "#ef4444",  // 에러/중요 문구
        },
        bg: {
          base: "#F2EAE8",      // 기본 배경
        },
        border: {
          default: "#575757",   // 기본 테두리
          card: "#8A8A8A",      // 조금 더 진한 테두리
        },
      },
      borderRadius: {
        default: "0.5rem",
        button: "0.375rem",
      },
      maxWidth: {
        360: "90rem", // 1440px
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

export default config;
