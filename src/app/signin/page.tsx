'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Lock, Mail, Eye, EyeOff, ArrowLeft, Package } from 'lucide-react';
import { getSiteLanguage, getStoreName } from '@/lib/catalog';
import { createSiteTranslator } from '@/lib/site-language';

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const storeName = getStoreName();
  const language = getSiteLanguage();
  const t = createSiteTranslator(language);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Signing in with:', email, password);
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-slate-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="group mb-6 flex items-center justify-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900 transition-transform group-hover:scale-110">
            <Package className="h-7 w-7 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">{storeName}</span>
        </Link>

        <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900">{t('おかえりなさい', 'Welcome back', '欢迎回来')}</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('または ', 'Or ', '或者 ')}
          <Link href="/" className="font-medium text-blue-600 underline underline-offset-4 hover:text-blue-500">
            {t('ゲストとして閲覧を続ける', 'continue browsing as a guest', '以访客身份继续浏览')}
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="border border-blue-50/50 bg-white px-6 py-10 shadow-2xl shadow-blue-100/50 backdrop-blur-sm sm:rounded-3xl sm:px-12">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-bold uppercase tracking-wider text-gray-700">{t('メールアドレス', 'Email address', '邮箱地址')}</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  className="block w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-4 text-gray-900 transition-all placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-bold uppercase tracking-wider text-gray-700">{t('パスワード', 'Password', '密码')}</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  className="block w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-12 text-gray-900 transition-all placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 transition-colors hover:text-gray-600">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 cursor-pointer rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500" />
                <label htmlFor="remember-me" className="ml-2 block cursor-pointer text-sm text-gray-700">{t('ログイン状態を保持', 'Remember me', '记住登录状态')}</label>
              </div>

              <div className="text-sm">
                <Link href="/" className="font-bold text-blue-600 hover:text-blue-500">{t('パスワードを忘れた場合', 'Forgot password?', '忘记密码？')}</Link>
              </div>
            </div>

            <Button type="submit" className="w-full rounded-2xl bg-gray-900 py-4 text-lg font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-xl active:translate-y-0">
              {t('ログイン', 'Sign in', '登录')}
            </Button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center text-sm font-bold uppercase tracking-widest">
                <span className="bg-white px-4 text-gray-400">{t('外部アカウントでログイン', 'Sign in with', '使用外部账号登录')}</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <button onClick={() => { window.location.href = 'https://accounts.google.com'; }} className="w-full rounded-2xl border border-gray-100 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50">
                Google
              </button>
              <button onClick={() => { window.location.href = 'https://appleid.apple.com'; }} className="w-full rounded-2xl border border-gray-100 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50">
                Apple
              </button>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          {t('購入前のご相談は ', 'Need help before buying? ', '购买前有疑问？')}
          <Link href="/support/contact" className="font-bold text-gray-900 hover:underline">
            {t('サポートへ連絡', 'Contact support', '联系支持团队')}
          </Link>
        </p>

        <div className="mt-12 flex justify-center">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 transition-colors hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            {t('ホームに戻る', 'Back to Home', '返回首页')}
          </Link>
        </div>
      </div>
    </div>
  );
}
