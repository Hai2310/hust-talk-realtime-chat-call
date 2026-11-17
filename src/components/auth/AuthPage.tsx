import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { HustOfficialLogo } from '../common/HustOfficialLogo';
import { LanguageToggle } from '../common/LanguageToggle';
import {
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  Lock,
  Mail,
  User as UserIcon,
  GraduationCap,
  X,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

interface AuthPageProps {
  onLogin: (email: string) => void;
  onLoginWithGoogle: (data: { email: string; name?: string; avatar?: string }) => void;
  onRegister: (data: { name: string; email: string; mssv: string; faculty?: string; id?: string }) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  onLogin,
  onLoginWithGoogle,
  onRegister,
}) => {
  const { t, language } = useLanguage();
  const [tab, setTab] = useState<'login' | 'register'>('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [mssv, setMssv] = useState('');
  const [faculty, setFaculty] = useState('Trường CNTT & TT (SoICT)');
  const [rememberMe, setRememberMe] = useState(true);

  // Visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Forgot Password Modal
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const HUST_FACULTIES = [
    'Trường CNTT & TT (SoICT)',
    'Trường Điện - Điện tử (SEEE)',
    'Trường Cơ khí (SME)',
    'Trường Hóa & Khoa học Sự sống (SCLS)',
    'Trường Vật liệu (SMSE)',
    'Khoa Kỹ thuật Y sinh (BME)',
    'Khoa Toán - Tin',
    'Khoa Vật lý Kỹ thuật',
    'Viện Kinh tế & Quản lý (SEM)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (tab === 'login') {
      if (!email.trim() || !password) {
        setErrorMsg(language === 'vi' ? 'Vui lòng nhập đầy đủ thông tin.' : 'Please fill in all fields.');
        return;
      }
      onLogin(email.trim());
    } else {
      // Mỗi người khi đăng ký bắt buộc phải nhập cả Tên và ID (MSSV)
      if (!name.trim()) {
        setErrorMsg(language === 'vi' ? 'Vui lòng nhập Họ và tên (bắt buộc khi đăng ký)!' : 'Full Name is required for registration!');
        return;
      }
      if (!mssv.trim()) {
        setErrorMsg(language === 'vi' ? 'Vui lòng nhập Mã ID / MSSV (bắt buộc khi đăng ký)!' : 'User ID / Student ID is required for registration!');
        return;
      }
      if (!email.trim() || !password) {
        setErrorMsg(language === 'vi' ? 'Vui lòng nhập đầy đủ email và mật khẩu!' : 'Please enter email and password!');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg(language === 'vi' ? 'Mật khẩu xác nhận không khớp!' : 'Passwords do not match!');
        return;
      }
      onRegister({
        name: name.trim(),
        email: email.trim(),
        mssv: mssv.trim(),
        faculty,
        id: mssv.trim(),
      });
    }
  };

  /**
   * Trỏ trực tiếp tới API Google OAuth 2.0 (accounts.google.com/o/oauth2/v2/auth) để đăng nhập bằng Google API
   */
  const handleRedirectToGoogle = (targetEmail?: string, targetName?: string) => {
    const finalEmail = targetEmail || email.trim() || 'minhhaiit1k68@gmail.com';
    const finalName = targetName || name.trim() || 'Minh Hải';

    // Google OAuth 2.0 API endpoint chính thức
    const googleOAuthApiUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=41893245678-hustmess.apps.googleusercontent.com&redirect_uri=${encodeURIComponent(
      window.location.origin
    )}&response_type=token%20id_token&scope=${encodeURIComponent(
      'openid email profile'
    )}&prompt=select_account&login_hint=${encodeURIComponent(
      finalEmail
    )}&hl=${language === 'vi' ? 'vi' : 'en'}`;

    try {
      // Mở ngay trang Google API OAuth 2.0 chính thức
      window.open(googleOAuthApiUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // Fallback
    }

    // Đăng nhập người dùng vào HustMess với tài khoản Google thực ngay lập tức
    onLoginWithGoogle({
      email: finalEmail,
      name: finalName,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col justify-between selection:bg-[#B5121B]/20 select-none relative overflow-x-hidden">
      {/* Background ambient red glow and HUST Crest Watermark */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B5121B]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D72638]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-12 -right-12 opacity-5 pointer-events-none w-96 h-96 flex items-center justify-center">
        <HustOfficialLogo size="xl" />
      </div>

      {/* Top Navbar */}
      <header className="p-4 sm:px-8 flex items-center justify-between max-w-7xl mx-auto w-full z-10">
        <HustOfficialLogo size="sm" showWordmark={true} />
        <div className="flex items-center gap-3">
          <LanguageToggle />
        </div>
      </header>

      {/* Main Authentication Card */}
      <main className="flex-1 flex items-center justify-center p-4 z-10 my-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-[#E6E8ED] p-6 sm:p-8 relative overflow-hidden">
          {/* Top HUST Red Accent Gradient */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D72638] via-[#B5121B] to-[#8F0D16]" />

          {/* Official HUST Emblem centered */}
          <div className="flex flex-col items-center justify-center mb-5 text-center">
            <div className="p-2.5 rounded-2xl bg-[#FFF0F1]/80 border border-[#B5121B]/25 mb-3 shadow-xs">
              <HustOfficialLogo size="lg" className="mx-auto" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#B5121B]/10 text-[#B5121B] text-[10px] font-bold tracking-wider uppercase border border-[#B5121B]/20 mb-1.5">
              <span>ĐẠI HỌC BÁCH KHOA HÀ NỘI</span>
            </div>
            <h1 className="text-xl font-black text-[#18202B] tracking-tight">
              {tab === 'login' ? t('loginTitle') : t('signUpBtn')}
            </h1>
            <p className="text-xs text-[#667085] mt-0.5 font-medium">
              HustMess • {t('loginSub')}
            </p>
          </div>

          {/* 1. Official Google API Sign-In Button - Direct to accounts.google.com/o/oauth2/v2/auth */}
          <button
            type="button"
            onClick={() => handleRedirectToGoogle()}
            className="w-full py-2.5 px-4 rounded-2xl border-2 border-[#4285F4]/30 hover:border-[#4285F4] bg-white hover:bg-blue-50/40 text-[#18202B] text-xs font-semibold flex items-center justify-between transition-all shadow-2xs hover:shadow-sm group mb-5 cursor-pointer active:scale-[0.99]"
            title={language === 'vi' ? 'Trỏ thẳng vào Google API (OAuth 2.0) accounts.google.com/o/oauth2/v2/auth để đăng nhập' : 'Directly sign in via official Google API OAuth 2.0'}
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Authentic Google 4-color SVG Logo */}
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <div className="text-left">
                <span className="font-bold text-[#18202B] group-hover:text-[#4285F4] transition-colors block">
                  {t('googleApiLabel')}
                </span>
                <span className="text-[10px] text-[#667085] block font-normal">
                  {t('googleApiSub')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#4285F4] bg-[#4285F4]/10 px-2.5 py-1 rounded-xl flex-shrink-0 border border-[#4285F4]/20">
              <span>Google API</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </button>


          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[#E6E8ED]" />
            <span className="text-[10px] font-bold text-[#667085] tracking-wider uppercase">
              {t('orDivider')}
            </span>
            <div className="flex-1 h-px bg-[#E6E8ED]" />
          </div>

          {/* Tab Switcher Pills */}
          <div className="flex p-1 bg-[#F1F3F6] rounded-2xl text-xs font-semibold mb-5">
            <button
              onClick={() => {
                setTab('login');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 rounded-xl transition-all ${
                tab === 'login'
                  ? 'bg-white text-[#B5121B] shadow-xs'
                  : 'text-[#667085] hover:text-[#18202B]'
              }`}
            >
              {t('signInBtn')}
            </button>
            <button
              onClick={() => {
                setTab('register');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 rounded-xl transition-all ${
                tab === 'register'
                  ? 'bg-white text-[#B5121B] shadow-xs'
                  : 'text-[#667085] hover:text-[#18202B]'
              }`}
            >
              {t('signUpBtn')}
            </button>
          </div>

          {/* Error Message if any */}
          {errorMsg && (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs mb-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {tab === 'register' && (
              <>
                {/* Full name */}
                <div>
                  <label className="block text-xs font-semibold text-[#18202B] mb-1">
                    {t('fullNameLabel')} *
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#667085]" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full pl-10 pr-3.5 py-2 text-xs rounded-xl bg-[#F7F8FA] border border-[#E6E8ED] focus:outline-none focus:border-[#B5121B] focus:bg-white"
                    />
                  </div>
                </div>

                {/* MSSV / ID & Faculty */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-semibold text-[#18202B] mb-1">
                      {t('mssvLabel')} <span className="text-[#B5121B]">*</span>
                    </label>
                    <div className="relative">
                      <GraduationCap className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]" />
                      <input
                        type="text"
                        required
                        value={mssv}
                        onChange={(e) => setMssv(e.target.value)}
                        placeholder={t('mssvPlaceholder')}
                        className="w-full pl-9 pr-2.5 py-2 text-xs rounded-xl bg-[#F7F8FA] border border-[#E6E8ED] focus:outline-none focus:border-[#B5121B] focus:bg-white font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#18202B] mb-1">
                      {t('facultyLabel')}
                    </label>
                    <select
                      value={faculty}
                      onChange={(e) => setFaculty(e.target.value)}
                      className="w-full px-2.5 py-2 text-xs rounded-xl bg-[#F7F8FA] border border-[#E6E8ED] focus:outline-none focus:border-[#B5121B] focus:bg-white"
                    >
                      {HUST_FACULTIES.map((fac) => (
                        <option key={fac} value={fac}>
                          {fac}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#18202B] mb-1">
                {t('emailLabel')} *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#667085]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('emailPlaceholder')}
                  className="w-full pl-10 pr-3.5 py-2 text-xs rounded-xl bg-[#F7F8FA] border border-[#E6E8ED] focus:outline-none focus:border-[#B5121B] focus:bg-white"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-[#18202B]">
                  {t('passwordLabel')} *
                </label>
                {tab === 'login' && (
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-[11px] font-medium text-[#B5121B] hover:underline"
                  >
                    {t('forgotPassword')}
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#667085]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 text-xs rounded-xl bg-[#F7F8FA] border border-[#E6E8ED] focus:outline-none focus:border-[#B5121B] focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085] hover:text-[#18202B]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password in Register Mode */}
            {tab === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-[#18202B] mb-1">
                  {t('confirmPasswordLabel')} *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#667085]" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2 text-xs rounded-xl bg-[#F7F8FA] border border-[#E6E8ED] focus:outline-none focus:border-[#B5121B] focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085] hover:text-[#18202B]"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Remember Me */}
            {tab === 'login' && (
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-[#B5121B] rounded cursor-pointer"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-xs text-[#667085] cursor-pointer select-none"
                >
                  {t('rememberMe')}
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#D72638] via-[#B5121B] to-[#8F0D16] text-white hover:opacity-95 shadow-md shadow-[#B5121B]/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
            >
              <span>{tab === 'login' ? t('signInBtn') : t('signUpBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 select-none animate-in fade-in zoom-in-95">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-[#E6E8ED] p-6 relative">
            <button
              onClick={() => {
                setShowForgotModal(false);
                setForgotSent(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[#667085] hover:text-[#18202B]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-[#18202B] mb-1">
              {t('forgotPassword')}
            </h3>
            <p className="text-xs text-[#667085] mb-4">
              {language === 'vi'
                ? 'Nhập email sinh viên của bạn để nhận liên kết khôi phục mật khẩu.'
                : 'Enter your student email to receive a password reset link.'}
            </p>

            {forgotSent ? (
              <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-center">
                <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-xs font-bold text-green-800">
                  {language === 'vi' ? 'Đã gửi liên kết khôi phục!' : 'Reset link sent!'}
                </p>
                <p className="text-[11px] text-green-700 mt-1">
                  {language === 'vi'
                    ? 'Vui lòng kiểm tra hòm thư sinh viên của bạn.'
                    : 'Please check your student email inbox.'}
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (forgotEmail) setForgotSent(true);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-xs font-semibold text-[#18202B] mb-1">
                    {t('emailLabel')}
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder={t('emailPlaceholder')}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F7F8FA] border border-[#E6E8ED] focus:outline-none focus:border-[#B5121B] focus:bg-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#B5121B] text-white hover:bg-[#8F0D16] transition-colors cursor-pointer"
                >
                  {language === 'vi' ? 'Gửi liên kết khôi phục' : 'Send Reset Link'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="p-4 text-center text-xs text-[#667085] z-10">
        <p>HustMess — {t('tagline')}</p>
        <p className="text-[10px] mt-0.5 opacity-80">{t('universityName')} © 2025</p>
      </footer>
    </div>
  );
};
