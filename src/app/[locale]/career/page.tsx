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
    education: "교육",
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
    education: "教育",
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
      title: "시스템 엔지니어",
      company: "k-Hack",
      period: "2023.10 - 현재",
      description: "웹 애플리케이션 개발 및 시스템 아키텍처 설계를 담당하고 있습니다."
    },
    en: {
      title: "System Engineer",
      company: "k-Hack",
      period: "Oct 2023 - Present",
      description: "Responsible for web application development and system architecture design."
    },
    zh: {
      title: "系统工程师",
      company: "k-Hack",
      period: "2023年10月 - 至今",
      description: "负责Web应用程序开发和系统架构设计。"
    },
    ja: {
      title: "システムエンジニア",
      company: "k-Hack",
      period: "2023年10月 - 現在",
      description: "Webアプリケーション開発とシステムアーキテクチャ設計を担当しています。"
    }
  },
  workExperience: [
    {
      ko: {
        title: "모바일 개발자",
        company: "쿠시로시 공공기관 A",
        period: "2025.07 - 현재",
        description: "iOS 및 Android용 모바일 애플리케이션 개발을 담당하고 있습니다.",
        achievements: ["요건 정의 및 설계", "디자인", "개발", "테스트 및 배포"]
      },
      en: {
        title: "Mobile Developer",
        company: "Kushiro Public Institution A",
        period: "Jul 2025 - Present",
        description: "Responsible for developing mobile applications for iOS and Android.",
        achievements: ["Requirement definition and design", "Design", "Development", "Testing and deployment"]
      },
      zh: {
        title: "移动开发工程师",
        company: "钏路市公共机构 A",
        period: "2025年7月 - 至今",
        description: "负责iOS和Android的移动应用开发。",
        achievements: ["需求定义与设计", "设计", "开发", "测试与部署"]
      },
      ja: {
        title: "モバイル開発者",
        company: "釧路市公共機関 A",
        period: "2025年7月 - 現在",
        description: "iOSおよびAndroid向けのモバイルアプリケーション開発を担当しています。",
        achievements: ["要件定義と設計", "デザイン", "開発", "テストと展開"]
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
      degree: "Apple Developer Academy 수료",
      school: "Apple @ Pohang",
      period: "2024 - 2025",
      description: "iOS 및 Swift를 중심으로 한 모바일 개발 집중 교육 과정 수료"
    },
    en: {
      degree: "Completed Apple Developer Academy",
      school: "Apple @ Pohang",
      period: "2024 - 2025",
      description: "Completed an intensive mobile development program focused on iOS and Swift"
    },
    zh: {
      degree: "完成 Apple Developer Academy",
      school: "Apple @ Pohang",
      period: "2024 - 2025",
      description: "完成了以iOS和Swift为中心的移动开发强化课程"
    },
    ja: {
      degree: "Apple Developer Academy 修了",
      school: "Apple @ Pohang",
      period: "2024 - 2025",
      description: "iOSとSwiftに焦点を当てたモバイル開発集中プログラムを修了"
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
          {/* <div className="mb-12">
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
          </div> */}

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
          {/* <div className="text-center bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t.downloadResume}
            </h2>
            <p className="text-gray-600 mb-6">
              {t.contactMe}
            </p>
            <DownloadResumeButton text={t.downloadResume} />
          </div> */}
        </div>
      </div>
    </Layout>
  );
} 