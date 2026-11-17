import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

interface LanguageToggleProps {
  compact?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ compact = false }) => {
  const { language, setLanguage } = useLanguage();

  if (compact) {
    return (
      <button
        onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-[#E6E8ED] hover:border-[#B5121B]/40 hover:bg-[#FFF0F1] transition-colors shadow-xs"
        title={language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
      >
        <span className="text-sm">{language === 'vi' ? '🇻🇳' : '🇬🇧'}</span>
        <span className="text-[#18202B] uppercase tracking-wider">{language}</span>
      </button>
    );
  }

  return (
    <div className="flex items-center p-1 bg-[#F1F3F6] rounded-xl border border-[#E6E8ED]">
      <button
        onClick={() => setLanguage('vi')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
          language === 'vi'
            ? 'bg-white text-[#B5121B] font-semibold shadow-xs'
            : 'text-[#667085] hover:text-[#18202B]'
        }`}
      >
        <span>🇻🇳</span>
        <span>Tiếng Việt</span>
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
          language === 'en'
            ? 'bg-white text-[#B5121B] font-semibold shadow-xs'
            : 'text-[#667085] hover:text-[#18202B]'
        }`}
      >
        <span>🇬🇧</span>
        <span>English</span>
      </button>
    </div>
  );
};
