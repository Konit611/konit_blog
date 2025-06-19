import React from 'react';
import { Layout } from '../../../components/Layout';
import { DownloadResumeButton } from '../../../components/DownloadResumeButton';

interface CareerPageProps {
  params: Promise<{
    locale: string;
  }>;
}

const translations = {
  ko: {
    title: "경력",
    subtitle: "소프트웨어 개발 분야에서의 전문적인 여정과 경험을 소개합니다",
    currentPosition: "현재 직책",
    experience: "경력",
    skills: "기술 스택",
    education: "학력",
    certifications: "자격증",
    achievements: "주요 성과",
    workExperience: "업무 경험",
    present: "현재",
    years: "년",
    downloadResume: "이력서 다운로드",
    contactMe: "연락하기"
  },
  en: {
    title: "Career",
    subtitle: "My professional journey and experience in software development",
    currentPosition: "Current Position",
    experience: "Experience",
    skills: "Technical Skills",
    education: "Education",
    certifications: "Certifications",
    achievements: "Key Achievements",
    workExperience: "Work Experience",
    present: "Present",
    years: "years",
    downloadResume: "Download Resume",
    contactMe: "Contact Me"
  },
  zh: {
    title: "职业经历",
    subtitle: "我在软件开发领域的专业历程和经验",
    currentPosition: "当前职位",
    experience: "经验",
    skills: "技术技能",
    education: "教育背景",
    certifications: "认证证书",
    achievements: "主要成就",
    workExperience: "工作经验",
    present: "至今",
    years: "年",
    downloadResume: "下载简历",
    contactMe: "联系我"
  },
  ja: {
    title: "キャリア",
    subtitle: "ソフトウェア開発分野での専門的な歩みと経験をご紹介します",
    currentPosition: "現在のポジション",
    experience: "経験",
    skills: "技術スキル",
    education: "学歴",
    certifications: "資格",
    achievements: "主な成果",
    workExperience: "業務経験",
    present: "現在",
    years: "年",
    downloadResume: "履歴書ダウンロード",
    contactMe: "お問い合わせ"
  }
};

// 경력 데이터 (실제 데이터로 교체 필요)
const careerData = {
  currentPosition: {
    ko: {
      title: "시니어 풀스택 개발자",
      company: "테크 컴퍼니",
      period: "2022.03 - 현재",
      description: "웹 애플리케이션 개발 및 시스템 아키텍처 설계를 담당하고 있습니다."
    },
    en: {
      title: "Senior Full Stack Developer",
      company: "Tech Company",
      period: "Mar 2022 - Present",
      description: "Responsible for web application development and system architecture design."
    },
    zh: {
      title: "高级全栈开发工程师",
      company: "科技公司",
      period: "2022年3月 - 至今",
      description: "负责Web应用程序开发和系统架构设计。"
    },
    ja: {
      title: "シニアフルスタック開発者",
      company: "テック企業",
      period: "2022年3月 - 現在",
      description: "Webアプリケーション開発とシステムアーキテクチャ設計を担当しています。"
    }
  },
  workExperience: [
    {
      ko: {
        title: "풀스택 개발자",
        company: "스타트업 A",
        period: "2020.06 - 2022.02",
        description: "React, Node.js를 활용한 웹 서비스 개발",
        achievements: ["MAU 10만 달성", "서비스 성능 50% 향상", "CI/CD 파이프라인 구축"]
      },
      en: {
        title: "Full Stack Developer",
        company: "Startup A",
        period: "Jun 2020 - Feb 2022",
        description: "Web service development using React and Node.js",
        achievements: ["Achieved 100K MAU", "Improved service performance by 50%", "Built CI/CD pipeline"]
      },
      zh: {
        title: "全栈开发工程师",
        company: "初创公司 A",
        period: "2020年6月 - 2022年2月",
        description: "使用React和Node.js进行Web服务开发",
        achievements: ["实现10万月活用户", "服务性能提升50%", "构建CI/CD流水线"]
      },
      ja: {
        title: "フルスタック開発者",
        company: "スタートアップ A",
        period: "2020年6月 - 2022年2月",
        description: "ReactとNode.jsを活用したWebサービス開発",
        achievements: ["MAU10万達成", "サービス性能50%向上", "CI/CDパイプライン構築"]
      }
    },
    {
      ko: {
        title: "프론트엔드 개발자",
        company: "IT 회사 B",
        period: "2018.03 - 2020.05",
        description: "React 기반 사용자 인터페이스 개발",
        achievements: ["모바일 반응형 UI 구현", "사용자 만족도 40% 향상", "코드 리뷰 문화 정착"]
      },
      en: {
        title: "Frontend Developer",
        company: "IT Company B",
        period: "Mar 2018 - May 2020",
        description: "React-based user interface development",
        achievements: ["Implemented mobile responsive UI", "Improved user satisfaction by 40%", "Established code review culture"]
      },
      zh: {
        title: "前端开发工程师",
        company: "IT公司 B",
        period: "2018年3月 - 2020年5月",
        description: "基于React的用户界面开发",
        achievements: ["实现移动端响应式UI", "用户满意度提升40%", "建立代码审查文化"]
      },
      ja: {
        title: "フロントエンド開発者",
        company: "IT企業 B",
        period: "2018年3月 - 2020年5月",
        description: "React基盤のユーザーインターフェース開発",
        achievements: ["モバイルレスポンシブUI実装", "ユーザー満足度40%向上", "コードレビュー文化定着"]
      }
    }
  ],
  skills: {
    frontend: ["React", "TypeScript", "Next.js", "Vue.js", "Tailwind CSS", "SCSS"],
    backend: ["Node.js", "Express", "Python", "Django", "PostgreSQL", "MongoDB"],
    tools: ["Git", "Docker", "AWS", "Vercel", "Figma", "Notion"],
    others: ["REST API", "GraphQL", "Jest", "Cypress", "Socket.io", "Redis"]
  },
  education: {
    ko: {
      degree: "컴퓨터공학 학사",
      school: "한국대학교",
      period: "2014 - 2018",
      description: "소프트웨어 공학, 데이터 구조, 알고리즘 전공"
    },
    en: {
      degree: "Bachelor of Computer Science",
      school: "Korea University",
      period: "2014 - 2018",
      description: "Major in Software Engineering, Data Structures, and Algorithms"
    },
    zh: {
      degree: "计算机科学学士",
      school: "韩国大学",
      period: "2014 - 2018",
      description: "主修软件工程、数据结构和算法"
    },
    ja: {
      degree: "コンピュータサイエンス学士",
      school: "韓国大学",
      period: "2014 - 2018",
      description: "ソフトウェア工学、データ構造、アルゴリズム専攻"
    }
  }
};

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ko' },
    { locale: 'zh' },
    { locale: 'ja' }
  ];
}

export default async function CareerPage({ params }: CareerPageProps) {
  const { locale } = await params;
  const t = translations[locale as keyof typeof translations] || translations.en;
  const data = careerData;

  return (
    <Layout locale={locale}>
      <div className="w-full">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600">
              {t.subtitle}
            </p>
          </div>

          {/* Current Position */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-500 pb-2">
              {t.currentPosition}
            </h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {data.currentPosition[locale as keyof typeof data.currentPosition].title}
              </h3>
              <p className="text-blue-600 font-medium mb-2">
                {data.currentPosition[locale as keyof typeof data.currentPosition].company}
              </p>
              <p className="text-gray-600 mb-3">
                {data.currentPosition[locale as keyof typeof data.currentPosition].period}
              </p>
              <p className="text-gray-700">
                {data.currentPosition[locale as keyof typeof data.currentPosition].description}
              </p>
            </div>
          </div>

          {/* Work Experience */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-500 pb-2">
              {t.workExperience}
            </h2>
            <div className="space-y-6">
              {data.workExperience.map((job, index) => {
                const jobData = job[locale as keyof typeof job];
                return (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {jobData.title}
                    </h3>
                    <p className="text-blue-600 font-medium mb-2">
                      {jobData.company}
                    </p>
                    <p className="text-gray-600 mb-3">
                      {jobData.period}
                    </p>
                    <p className="text-gray-700 mb-4">
                      {jobData.description}
                    </p>
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {t.achievements}:
                      </h4>
                      <ul className="list-disc list-inside space-y-1">
                        {jobData.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="text-gray-700">
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-500 pb-2">
              {t.skills}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.frontend.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.backend.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.tools.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Others</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.others.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-500 pb-2">
              {t.education}
            </h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {data.education[locale as keyof typeof data.education].degree}
              </h3>
              <p className="text-blue-600 font-medium mb-2">
                {data.education[locale as keyof typeof data.education].school}
              </p>
              <p className="text-gray-600 mb-3">
                {data.education[locale as keyof typeof data.education].period}
              </p>
              <p className="text-gray-700">
                {data.education[locale as keyof typeof data.education].description}
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t.downloadResume}
            </h2>
            <p className="text-gray-600 mb-6">
              {t.contactMe}
            </p>
            <DownloadResumeButton text={t.downloadResume} />
          </div>
        </div>
      </div>
    </Layout>
  );
} 