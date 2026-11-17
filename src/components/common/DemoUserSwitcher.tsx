import React, { useState } from 'react';
import { User } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { UserCheck, ChevronDown, Sparkles } from 'lucide-react';

interface DemoUserSwitcherProps {
  currentUser: User | null;
  users: User[];
  onSwitchUser: (userId: string) => void;
}

export const DemoUserSwitcher: React.FC<DemoUserSwitcherProps> = ({
  currentUser,
  users,
  onSwitchUser,
}) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FFF0F1] text-[#B5121B] border border-[#B5121B]/30 hover:bg-[#B5121B] hover:text-white transition-all shadow-xs group"
        title={t('switchUser')}
      >
        <Sparkles className="w-3.5 h-3.5 text-[#B5121B] group-hover:text-white" />
        <span className="truncate max-w-[120px]">
          {currentUser ? currentUser.name : t('switchUser')}
        </span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 w-72 bg-white rounded-xl shadow-xl border border-[#E6E8ED] p-2 z-50 animate-in fade-in zoom-in-95">
          <div className="px-2 py-1.5 border-b border-[#E6E8ED] mb-1.5 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085]">
              {t('demoAccountsTitle')}
            </span>
          </div>

          <div className="space-y-1 max-h-64 overflow-y-auto">
            {users.map((u) => {
              const isSelected = currentUser?.id === u.id;
              return (
                <button
                  key={u.id}
                  onClick={() => {
                    onSwitchUser(u.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 p-2 rounded-lg text-left transition-all ${
                    isSelected
                      ? 'bg-[#FFF0F1] border border-[#B5121B]/40 text-[#B5121B]'
                      : 'hover:bg-[#F7F8FA] text-[#18202B]'
                  }`}
                >
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#E6E8ED]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold truncate">{u.name}</p>
                      {isSelected && <UserCheck className="w-3.5 h-3.5 text-[#B5121B]" />}
                    </div>
                    <p className="text-[10px] text-[#667085] truncate">
                      {u.mssv ? `MSSV: ${u.mssv}` : u.faculty}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
