import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header/Header.jsx';
import Home from './Pages/Home/Home.jsx';
import "./assets/css/global.css";

function App() {
  const [lang, setLang] = useState('en'); 

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased selection:bg-blue-100">
      <Header lang={lang} setLang={setLang} />
      <Routes>
        <Route path="/" element={<Home lang={lang} />} />
      </Routes>
    </div>
  );
}

export default App;