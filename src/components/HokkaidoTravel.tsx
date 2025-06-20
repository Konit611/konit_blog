import React from "react";
import Link from "next/link";
import { Layout } from "./Layout";

interface HokkaidoTravelProps {
  locale: string;
}

export const HokkaidoTravel: React.FC<HokkaidoTravelProps> = ({ locale }) => {
  // 언어별 텍스트 정의
  const translations = {
    en: {
      hero: {
        title: "Code & Learn\nEvery Day",
        button: "Explore Articles"
      }
    },
    ko: {
      hero: {
        title: "매일 코드하고\n배워가는 기록",
        button: "글 둘러보기"
      }
    },
    zh: {
      hero: {
        title: "每天编程\n每天学习",
        button: "探索文章"
      }
    },
    ja: {
      hero: {
        title: "毎日コードして\n毎日学ぶ記録",
        button: "記事を探索"
      }
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <Layout locale={locale}>
      {/* Main Content */}
      <div className="container">
        <div className="main-content">
          <div className="landing-page-hero">
            <div className="discover-the-beauty">
              {t.hero.title.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < t.hero.title.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>

            <Link href={`/${locale}/blog`}>
              <div className="button-large">
                <div className="div">{t.hero.button}</div>
              </div>
            </Link>

            <div className="a-breathtaking-view" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .container {
          align-items: center;
          align-self: stretch;
          display: flex;
          flex: 1 1 auto;
          flex-direction: column;
          position: relative;
          width: 100%;
          justify-content: center;
        }

        .main-content {
          align-items: center;
          align-self: stretch;
          background-color: #ffffff;
          display: flex;
          flex: 0 0 auto;
          height: 1000px;
          justify-content: center;
          position: relative;
          width: 100%;
        }

        .landing-page-hero {
          align-items: center;
          display: flex;
          flex-direction: column;
          gap: 20px;
          height: 1000px;
          justify-content: center;
          position: relative;
          width: 100%;
          padding: 0 10px;
        }

        .discover-the-beauty {
          color: #000000;
          font-family: var(--font-domine), serif;
          font-size: 100px;
          font-weight: 700;
          letter-spacing: -5px;
          line-height: 105px;
          position: relative;
          text-align: center;
          white-space: nowrap;
          width: fit-content;
        }

        .button-large {
          align-items: center;
          background-color: #000000;
          border-radius: 12px;
          cursor: pointer;
          display: inline-flex;
          flex: 0 0 auto;
          height: 64px;
          justify-content: center;
          overflow: hidden;
          padding: 20px 32px;
          position: relative;
          transition: all 0.3s ease;
        }

        .button-large:hover {
          background-color: #333333;
          transform: translateY(-2px);
        }

        .div {
          color: #ffffff;
          font-family: var(--font-outfit), sans-serif;
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 0;
          line-height: 20px;
          position: relative;
          white-space: nowrap;
          width: fit-content;
        }

        .a-breathtaking-view {
          background-image: url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80");
          background-position: 50% 50%;
          background-size: cover;
          border-radius: 24px;
          height: 500px;
          position: relative;
          width: 100%;
          max-width: 1200px;
          min-width: 300px;
        }

        /* 반응형 디자인 */
        @media (max-width: 768px) {
          .container {
            padding-top: 20px;
          }

          .discover-the-beauty {
            font-size: 60px;
            line-height: 60px;
            letter-spacing: -3px;
          }

          .landing-page-hero {
            height: auto;
            padding: 40px 20px;
            gap: 30px;
          }

          .main-content {
            height: auto;
            min-height: 600px;
          }

          .a-breathtaking-view {
            height: 300px;
            max-width: 100%;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding-top: 20px;
          }

          .discover-the-beauty {
            font-size: 40px;
            line-height: 40px;
            letter-spacing: -2px;
          }

          .button-large {
            height: 56px;
            padding: 16px 24px;
          }

          .div {
            font-size: 16px;
            line-height: 20px;
          }

          .landing-page-hero {
            gap: 24px;
          }

          .a-breathtaking-view {
            height: 250px;
          }
        }
      `}</style>
    </Layout>
  );
}; 