import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Mail,
  Code,
  Briefcase,
  Trophy,
  Sparkles,
  ExternalLink,
  Cpu,
  Star,
} from "lucide-react";
import API from '../api';
import { motion } from "framer-motion";

const Portfolio = () => {
  const { username } = useParams();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(`/api/user/${username}`);

        setUserData(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchData();
  }, [username]);

  // Loading Screen
  if (!userData)
    return (
      <div className="h-screen flex items-center justify-center bg-[#020617] overflow-hidden relative">

        {/* Background Glow */}
        <div className="absolute w-[400px] h-[400px] bg-indigo-500/20 blur-[120px] rounded-full top-10 left-10" />
        <div className="absolute w-[400px] h-[400px] bg-pink-500/20 blur-[120px] rounded-full bottom-10 right-10" />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
          className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
        />
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] overflow-hidden relative text-slate-900 dark:text-white">

      {/* Grid Background */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Noise */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Glow Orbs */}
      <motion.div
        animate={{
          x: [0, 120, 0],
          y: [0, 60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full"
      />

      <motion.div
        animate={{
          x: [0, -120, 0],
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-pink-500/20 blur-[120px] rounded-full"
      />

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-24 pb-20 text-center">

        {/* AI Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-500 font-semibold text-sm mb-8"
        >
          <Sparkles size={16} />
          AI Generated Portfolio
        </motion.div>

        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1 shadow-[0_0_50px_rgba(99,102,241,0.5)]"
        >
          <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-5xl font-black text-white">
            {userData.name?.charAt(0)}
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-5xl md:text-7xl font-black tracking-tight"
        >
          {userData.name}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-5 max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed"
        >
          Passionate developer crafting modern digital experiences
          with creativity, clean code, and AI-powered innovation.
        </motion.p>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex justify-center"
        >
          <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-white/10 backdrop-blur-xl shadow-lg">
            <Mail size={18} className="text-indigo-500" />

            <span className="text-sm md:text-base text-slate-700 dark:text-slate-300 break-all">
              {userData.email}
            </span>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pb-24">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="space-y-8">

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[2rem] p-7 bg-white/50 dark:bg-slate-900/50 border border-white/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(99,102,241,0.1)]"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                  <Code size={22} />
                </div>

                <h2 className="text-2xl font-black">
                  Skills
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {userData.skills?.map((skill, i) => (
                  <motion.div
                    whileHover={{
                      scale: 1.08,
                      y: -3,
                    }}
                    key={i}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500/10 to-pink-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-300 font-semibold text-sm backdrop-blur-xl"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* About Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-[2rem] p-7 bg-white/50 dark:bg-slate-900/50 border border-white/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(99,102,241,0.1)]"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-500 text-white">
                  <Cpu size={22} />
                </div>

                <h2 className="text-2xl font-black">
                  About
                </h2>
              </div>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                A creative and detail-oriented developer focused on
                building beautiful user experiences, scalable systems,
                and impactful digital products.
              </p>
            </motion.div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2 space-y-8">

            {/* Experience */}
            {userData.experience && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-[2rem] p-8 bg-white/50 dark:bg-slate-900/50 border border-white/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(99,102,241,0.1)]"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white">
                    <Briefcase size={24} />
                  </div>

                  <h2 className="text-3xl font-black">
                    Experience
                  </h2>
                </div>

                <div className="space-y-8">
                  {userData.experience.map((exp, i) => (
                    <motion.div
                      whileHover={{ x: 8 }}
                      key={i}
                      className="relative pl-8 border-l border-indigo-500/20"
                    >
                      <div className="absolute left-[-8px] top-1 w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 shadow-lg" />

                      <h3 className="text-2xl font-bold">
                        {exp.role || exp.title}
                      </h3>

                      <p className="text-indigo-500 font-semibold mt-1">
                        {exp.company || exp.organization}
                      </p>

                      <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
                        {exp.description || exp.details}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Projects */}
            {userData.projects && (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-[2rem] p-8 bg-white/50 dark:bg-slate-900/50 border border-white/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(99,102,241,0.1)]"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                    <Trophy size={24} />
                  </div>

                  <h2 className="text-3xl font-black">
                    Projects
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {userData.projects.map((proj, i) => (
                    <motion.div
                      whileHover={{
                        y: -10,
                        scale: 1.02,
                      }}
                      key={i}
                      className="group relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-white/60 to-white/20 dark:from-slate-800/60 dark:to-slate-900/30 border border-white/10 backdrop-blur-xl shadow-lg hover:shadow-[0_0_40px_rgba(99,102,241,0.2)] transition-all duration-500"
                    >

                      {/* Glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10" />

                      <div className="relative z-10">

                        <div className="flex items-start justify-between">
                          <Star className="text-yellow-400" />

                          {proj.link && (
                            <a
                              href={proj.link}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 transition"
                            >
                              <ExternalLink size={18} />
                            </a>
                          )}
                        </div>

                        <h3 className="mt-5 text-2xl font-black">
                          {proj.title || proj.name}
                        </h3>

                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                          {proj.description || proj.details}
                        </p>

                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 mt-6 text-indigo-500 font-semibold hover:gap-3 transition-all"
                          >
                            View Project
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-10 text-center text-slate-500 dark:text-slate-400">
        <p className="font-medium">
          Designed with ❤️ using AI + React + Tailwind
        </p>

        <p className="text-sm opacity-60 mt-2">
          © 2026 Portfolio AI
        </p>
      </footer>
    </div>
  );
};

export default Portfolio;