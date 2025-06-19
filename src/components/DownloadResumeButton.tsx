'use client';

import React from 'react';

interface DownloadResumeButtonProps {
  text: string;
}

export function DownloadResumeButton({ text }: DownloadResumeButtonProps) {
  const handleResumeDownload = () => {
    // 실제 이력서 파일 다운로드 로직
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // 실제 이력서 파일 경로
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleResumeDownload}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
    >
      {text}
    </button>
  );
} 