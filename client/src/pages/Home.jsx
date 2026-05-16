import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload,
    Sparkles,
    FileText,
    Sun,
    Moon,
    Zap,
    Shield,
    Cpu,
} from 'lucide-react';

import API from '../api';

const Home = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(true);

    const navigate = useNavigate();

    // Theme Persistence
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            setDarkMode(savedTheme === 'dark');
        }
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) return;

        const formData = new FormData();
        formData.append('resume', file);

        setLoading(true);

        try {
            const res = await API.post('/api/upload', formData);
            navigate(`/${res.data.username}`);
        } catch (err) {
            alert('AI is busy, try again!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen overflow-x-hidden relative bg-slate-50 dark:bg-[#020617] transition-colors duration-500 font-sans">

            {/* Grid Background */}
            <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Noise Overlay */}
            <div className="absolute inset-0 -z-10 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Animated Glow Orbs */}
            <div className="absolute inset-0 overflow-hidden -z-10">

                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, 120, 0],
                        y: [0, 60, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                    }}
                    className="absolute -top-24 -left-24 w-[260px] h-[260px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-indigo-500/20 blur-[120px] rounded-full"
                />

                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, -120, 0],
                        y: [0, -60, 0],
                    }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                    }}
                    className="absolute -bottom-24 -right-24 w-[260px] h-[260px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-pink-500/20 blur-[120px] rounded-full"
                />
            </div>

            {/* Navbar */}
            <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-4 sm:py-6">

                {/* Logo */}
                <div className="flex items-center gap-2 sm:gap-3">

                    <div className="p-2 sm:p-3 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white shadow-[0_0_30px_rgba(99,102,241,0.6)]">
                        <Cpu size={20} className="sm:w-6 sm:h-6" />
                    </div>

                    <h1 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                        BuildFolio-AI
                    </h1>
                </div>

                {/* Theme Toggle */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setDarkMode(!darkMode)}
                    className="relative w-14 sm:w-16 h-8 sm:h-9 rounded-full bg-slate-300 dark:bg-slate-700 transition-all duration-500 flex items-center px-1 shadow-inner"
                >
                    <motion.div
                        animate={{
                            x: darkMode ? 24 : 0,
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 20,
                        }}
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-lg"
                    >
                        {darkMode ? (
                            <Moon
                                size={14}
                                className="text-yellow-400"
                            />
                        ) : (
                            <Sun
                                size={14}
                                className="text-orange-500"
                            />
                        )}
                    </motion.div>
                </motion.button>
            </nav>

            {/* Hero */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-16 sm:pb-24 text-center">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold text-xs sm:text-sm mb-6 sm:mb-8"
                >
                    <Sparkles size={14} />
                    New: Groq-Llama 3.3 Engine Live
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-slate-900 dark:text-white"
                >
                    Stop Building.
                    <br />

                    <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent italic">
                        Just Upload.
                    </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-2xl mx-auto mt-6 sm:mt-8 text-base sm:text-lg md:text-xl px-2 text-slate-600 dark:text-slate-400 leading-relaxed"
                >
                    Build a stunning AI portfolio website instantly.
                    No coding. No templates. Just upload your resume
                    and let AI do the rest.
                </motion.p>

                {/* Upload Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, -10, 0],
                    }}
                    transition={{
                        delay: 0.3,
                        duration: 4,
                        repeat: Infinity,
                    }}
                    className="mt-10 sm:mt-16 bg-white/70 dark:bg-slate-900/60 p-2 sm:p-3 rounded-[2rem] sm:rounded-[2.5rem] backdrop-blur-2xl border border-white/20 shadow-[0_0_80px_rgba(99,102,241,0.15)]"
                >

                    {/* Upload Area */}
                    <div className="relative overflow-hidden p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border-2 border-dashed border-slate-300 dark:border-slate-700 group hover:border-indigo-500 transition-all duration-500 hover:shadow-[0_0_50px_rgba(99,102,241,0.2)]">

                        {/* Hover Glow */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10" />

                        {/* File Input */}
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="absolute inset-0 opacity-0 cursor-pointer z-20"
                        />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-5 py-6 sm:py-10">

                            <motion.div
                                whileHover={{
                                    rotate: 12,
                                    scale: 1.1,
                                }}
                                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.5)]"
                            >
                                <Upload
                                    className="text-white"
                                    size={32}
                                />
                            </motion.div>

                            <div>

                                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white break-all px-2">
                                    {file
                                        ? file.name
                                        : 'Choose Resume PDF'}
                                </h2>

                                <p className="mt-2 text-sm sm:text-base text-slate-500 dark:text-slate-400">
                                    Drag & drop your resume here
                                </p>

                                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                                    Maximum size 5MB • PDF Only
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Generate Button */}
                    <button
                        onClick={handleUpload}
                        disabled={loading || !file}
                        className={`w-full py-4 sm:py-5 rounded-2xl mt-5 text-base sm:text-lg md:text-xl font-black transition-all flex items-center justify-center gap-3 overflow-hidden relative group ${
                            loading || !file
                                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                                : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_rgba(99,102,241,0.5)]'
                        }`}
                    >

                        {/* Shine Effect */}
                        {!loading && file && (
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        )}

                        <AnimatePresence mode="wait">

                            {loading ? (
                                <motion.div
                                    key="loading"
                                    initial={{ y: 20 }}
                                    animate={{ y: 0 }}
                                    exit={{ y: -20 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                                    Parsing Knowledge...
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="idle"
                                    initial={{ y: 20 }}
                                    animate={{ y: 0 }}
                                    exit={{ y: -20 }}
                                    className="flex items-center gap-2 sm:gap-3 relative z-10"
                                >
                                    Generate Portfolio

                                    <Zap
                                        size={18}
                                        fill="currentColor"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </motion.div>

                {/* Features */}
                <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-slate-500 dark:text-slate-400">

                    <div className="flex items-center justify-center gap-2 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/10 text-sm sm:text-base">
                        <Shield size={18} />
                        100% Secure
                    </div>

                    <div className="flex items-center justify-center gap-2 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/10 text-sm sm:text-base">
                        <Zap size={18} />
                        Instant AI Result
                    </div>

                    <div className="flex items-center justify-center gap-2 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/10 text-sm sm:text-base">
                        <FileText size={18} />
                        Smart Resume Extraction
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 dark:border-slate-800 py-8 sm:py-10 text-center text-slate-500 dark:text-slate-400 px-4">

                <p className="font-medium tracking-wide text-sm sm:text-base">
                    Made with ❤️ by{' '}
                    <span className="font-black bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
                        Madhu Sailesh Sasamal
                    </span>
                </p>

                <p className="mt-2 text-xs opacity-50">
                    © 2026 All Rights Reserved
                </p>
            </footer>
        </div>
    );
};

export default Home;