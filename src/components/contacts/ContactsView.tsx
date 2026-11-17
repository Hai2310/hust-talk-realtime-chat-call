import React, { useState } from 'react';
import { User } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  Search,
  MessageSquare,
  Phone,
  Video,
  GraduationCap,
  Sparkles,
  School,
  UserCheck,
  X,
  Copy,
  Check,
  Hash,
  User as UserIcon,
} from 'lucide-react';

interface ContactsViewProps {
  users: User[];
  currentUser: User | null;
  onStartChat: (user: User) => void;
  onStartCall: (user: User, callType: 'audio' | 'video') => void;
  onlineUserIds: Set<string>;
}

export const ContactsView: React.FC<ContactsViewProps> = ({
  users,
  currentUser,
  onStartChat,
  onStartCall,
  onlineUserIds,
}) => {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState('');
  const [searchMode, setSearchMode] = useState<'all' | 'name' | 'id'>('all');
  const [filterRole, setFilterRole] = useState<'all' | 'student' | 'lecturer'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyId = (idToCopy: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(idToCopy);
    setCopiedId(idToCopy);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const cleanQ = query.trim().toLowerCase();

  const filtered = users.filter((u) => {
    if (u.id === currentUser?.id) return false;

    let match = true;
    if (cleanQ) {
      const matchesName = u.name.toLowerCase().includes(cleanQ);
      const matchesId = Boolean(
        (u.id && u.id.toLowerCase().includes(cleanQ)) ||
        (u.mssv && u.mssv.toLowerCase().includes(cleanQ))
      );
      const matchesEmail = Boolean(u.email && u.email.toLowerCase().includes(cleanQ));

      if (searchMode === 'name') {
        match = matchesName;
      } else if (searchMode === 'id') {
        match = matchesId;
      } else {
        match = Boolean(matchesName || matchesId || matchesEmail);
      }
    }

    if (!match) return false;
    if (filterRole === 'student') return u.role === 'student';
    if (filterRole === 'lecturer') return u.role === 'lecturer';
    return true;
  });

  return (
    <div className="flex-1 bg-[#F7F8FA] flex flex-col h-full select-none overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-6 bg-white border-b border-[#E6E8ED]">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h1 className="text-xl font-bold text-[#18202B] flex items-center gap-2">
                <span>{t('contactsTitle')}</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FFF0F1] text-[#B5121B] border border-[#B5121B]/30">
                  {filtered.length} {t('members')}
                </span>
              </h1>
              <p className="text-xs text-[#667085] mt-1">
                {t('contactsSubtitle')}
              </p>
            </div>

            {/* Quick search mode switch: Tất cả | Tên | ID */}
            <div className="flex items-center gap-1.5 p-1 bg-[#F1F3F6] rounded-xl text-xs font-semibold self-start sm:self-auto border border-[#E6E8ED]/80">
              <span className="text-[11px] text-[#667085] px-2 font-medium flex items-center gap-1">
                <Search className="w-3.5 h-3.5" />
                <span>{language === 'vi' ? 'Tìm theo:' : 'Search by:'}</span>
              </span>
              <button
                type="button"
                onClick={() => setSearchMode('all')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  searchMode === 'all'
                    ? 'bg-white text-[#B5121B] shadow-2xs font-bold'
                    : 'text-[#667085] hover:text-[#18202B]'
                }`}
              >
                {t('searchModeAll')}
              </button>
              <button
                type="button"
                onClick={() => setSearchMode('name')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  searchMode === 'name'
                    ? 'bg-white text-[#B5121B] shadow-2xs font-bold'
                    : 'text-[#667085] hover:text-[#18202B]'
                }`}
              >
                <UserIcon className="w-3 h-3" />
                <span>{t('searchModeName')}</span>
              </button>
              <button
                type="button"
                onClick={() => setSearchMode('id')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  searchMode === 'id'
                    ? 'bg-white text-[#B5121B] shadow-2xs font-bold'
                    : 'text-[#667085] hover:text-[#18202B]'
                }`}
              >
                <Hash className="w-3 h-3" />
                <span>{t('searchModeId')}</span>
              </button>
            </div>
          </div>

          {/* Search bar & filter pills */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#667085]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  searchMode === 'name'
                    ? language === 'vi' ? 'Nhập tên người dùng cần tìm...' : 'Enter user name to search...'
                    : searchMode === 'id'
                    ? language === 'vi' ? 'Nhập ID hoặc MSSV cần tìm (ví dụ: 20235678, user-1)...' : 'Enter user ID or Student ID...'
                    : t('searchContactsPlaceholder')
                }
                className="w-full pl-10 pr-9 py-2.5 text-xs rounded-xl bg-[#F7F8FA] border border-[#E6E8ED] focus:outline-none focus:border-[#B5121B] focus:bg-white transition-all placeholder:text-[#667085]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085] hover:text-[#18202B] p-0.5 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-[#F1F3F6] rounded-xl text-xs font-medium self-stretch sm:self-auto">
              <button
                onClick={() => setFilterRole('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterRole === 'all'
                    ? 'bg-white text-[#B5121B] font-semibold shadow-xs'
                    : 'text-[#667085] hover:text-[#18202B]'
                }`}
              >
                {t('tabAll')}
              </button>
              <button
                onClick={() => setFilterRole('student')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterRole === 'student'
                    ? 'bg-white text-[#B5121B] font-semibold shadow-xs'
                    : 'text-[#667085] hover:text-[#18202B]'
                }`}
              >
                {t('studentBadge')}
              </button>
              <button
                onClick={() => setFilterRole('lecturer')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterRole === 'lecturer'
                    ? 'bg-white text-[#B5121B] font-semibold shadow-xs'
                    : 'text-[#667085] hover:text-[#18202B]'
                }`}
              >
                {t('lecturerBadge')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filtered.length === 0 ? (
            <div className="col-span-full py-16 text-center flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed border-[#E6E8ED] p-8">
              <Search className="w-10 h-10 text-[#667085]/40 mb-3" />
              <h3 className="text-sm font-bold text-[#18202B] mb-1">
                {language === 'vi' ? 'Không tìm thấy người dùng phù hợp' : 'No matching users found'}
              </h3>
              <p className="text-xs text-[#667085] max-w-sm">
                {language === 'vi'
                  ? `Không có ai khớp với từ khóa "${query}" theo ${searchMode === 'name' ? 'Tên' : searchMode === 'id' ? 'ID' : 'Tên hoặc ID'}. Hãy thử tìm bằng Tên hoặc Mã ID/MSSV khác.`
                  : `No results for "${query}". Try searching by another Name or User ID.`}
              </p>
              {query && (
                <button
                  onClick={() => {
                    setQuery('');
                    setSearchMode('all');
                  }}
                  className="mt-4 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#FFF0F1] text-[#B5121B] hover:bg-[#B5121B] hover:text-white transition-all"
                >
                  {language === 'vi' ? 'Xóa bộ lọc tìm kiếm' : 'Clear search'}
                </button>
              )}
            </div>
          ) : (
            filtered.map((user) => {
              const isOnline = onlineUserIds.has(user.id);
              const displayId = user.mssv || user.id;
              const isIdMatched =
                cleanQ &&
                ((user.id && user.id.toLowerCase().includes(cleanQ)) ||
                  (user.mssv && user.mssv.toLowerCase().includes(cleanQ)));

              return (
                <div
                  key={user.id}
                  className="bg-white border border-[#E6E8ED] rounded-2xl p-4 flex flex-col justify-between hover:border-[#B5121B]/40 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-13 h-13 rounded-2xl object-cover border border-[#E6E8ED]"
                      />
                      <span
                        className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                          isOnline ? 'bg-[#16A34A]' : 'bg-gray-300'
                        }`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <h3 className="text-sm font-bold text-[#18202B] truncate group-hover:text-[#B5121B] transition-colors">
                          {user.name}
                        </h3>
                        {user.role === 'lecturer' ? (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200">
                            {t('lecturerBadge')}
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200">
                            {user.mssv && user.mssv.length >= 4 ? `K${user.mssv.substring(2, 4)}` : 'HUST'}
                          </span>
                        )}
                      </div>

                      {/* Prominent ID Badge with copy */}
                      <div className="flex items-center gap-2 mb-1.5">
                        <div
                          className={`inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded-lg border transition-all ${
                            isIdMatched
                              ? 'bg-amber-50 text-amber-900 border-amber-300 ring-2 ring-amber-200/50'
                              : 'bg-[#F1F3F6] text-[#18202B] border-[#E6E8ED]'
                          }`}
                          title={`ID: ${displayId}`}
                        >
                          <Hash className="w-3 h-3 text-[#667085]" />
                          <span>ID: {displayId}</span>
                          <button
                            type="button"
                            onClick={(e) => handleCopyId(displayId, e)}
                            className="ml-1 text-[#667085] hover:text-[#B5121B] transition-colors p-0.5 rounded hover:bg-white"
                            title={t('copyId')}
                          >
                            {copiedId === displayId ? (
                              <Check className="w-3 h-3 text-[#16A34A]" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-[#667085] truncate font-medium">
                        {user.faculty || 'Đại học Bách khoa Hà Nội'}
                      </p>

                      {user.statusMessage && (
                        <p className="text-[11px] text-[#667085] truncate italic mt-1">
                          "{user.statusMessage}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#E6E8ED]/70">
                    <span className="text-[11px] text-[#667085] truncate max-w-[160px]">
                      {user.email}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onStartChat(user)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#FFF0F1] text-[#B5121B] hover:bg-[#B5121B] hover:text-white transition-all shadow-xs cursor-pointer"
                        title={t('messageAction')}
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{t('messageAction')}</span>
                      </button>

                      <button
                        onClick={() => onStartCall(user, 'audio')}
                        className="p-1.5 rounded-xl text-[#667085] bg-[#F1F3F6] hover:bg-[#B5121B] hover:text-white transition-all shadow-xs cursor-pointer"
                        title={t('callAudio')}
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onStartCall(user, 'video')}
                        className="p-1.5 rounded-xl text-[#667085] bg-[#F1F3F6] hover:bg-[#B5121B] hover:text-white transition-all shadow-xs cursor-pointer"
                        title={t('callVideo')}
                      >
                        <Video className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
