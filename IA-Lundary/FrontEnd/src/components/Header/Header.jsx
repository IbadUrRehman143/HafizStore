import React from 'react';
import Image1 from "../../assets/Images/ibad.jpeg";

const Header = ({ lang, setLang }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md px-6 py-3 shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        
        {/* Logo Section */}
        <div className="flex shrink-0 items-center">
          <img 
            src={Image1} 
            alt="Logo" 
            className="h-12 w-auto object-contain transition-transform duration-300 hover:scale-105 md:h-16" 
          />
        </div>

        {/* Search Bar Section */}
        <div className="relative group w-full max-w-md md:flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-blue-500">
            <span className="text-lg">🔍</span>
          </div>
          <input 
            type="text" 
            placeholder={
              lang === 'en' ? 'Search Customer...' : 
              lang === 'ur' ? 'گاہک تلاش کریں...' : 
              'بحث عن عميل...'
            } 
            className="w-full rounded-2xl border-0 bg-slate-100 py-2.5 pl-11 pr-4 text-sm outline-none ring-1 ring-transparent transition-all focus:bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Actions Section */}
        <div className="flex w-full items-center justify-center gap-3 md:w-auto md:justify-end">
          <button className="whitespace-nowrap rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-200 transition-all active:scale-95 hover:bg-blue-700">
            {lang === 'en' ? 'Monthly Data' : lang === 'ur' ? 'ماہانہ ڈیٹا' : 'البيانات الشهرية'}
          </button>

          <div className="relative">
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              className="appearance-none rounded-xl border-0 bg-slate-100 px-4 py-2.5 pr-8 text-sm font-bold text-slate-700 outline-none ring-1 ring-transparent transition-all focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="en">🇺🇸 EN</option>
              <option value="ur">🇵🇰 اردو</option>
              <option value="ar">🇸🇦 العربية</option>
            </select>
            {/* Custom Arrow for Select */}
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-slate-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Header;