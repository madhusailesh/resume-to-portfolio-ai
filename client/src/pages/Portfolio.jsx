import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Mail,
  Code,
  Briefcase,
  Trophy,
  Sparkles,
  ExternalLink,
  Cpu,
  Star,
  Database,
  Wrench,
} from "lucide-react";

import { motion } from "framer-motion";
import API from "../api";

const Portfolio = () => {
  const { username } = useParams();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(`/api/user/${username}`);
        console.log(res.data);

        setUserData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [username]);

  if (!userData) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="w-14 h-14 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Extract Correct Data
  const name =
    userData.personalInfo?.name ||
    userData.personalInfo?.fullName ||
    "Portfolio User";

  const email =
    userData.email ||
    userData.personalInfo?.email ||
    "No email";

  // Merge Skills
  const allSkills = [
    ...(userData.skills?.frontend || []),
    ...(userData.skills?.backend || []),
    ...(userData.skills?.languages || []),
    ...(userData.skills?.tools || []),
    ...(userData.skills?.databases || []),
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative">

      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-500/20 blur-[120px] rounded-full" />

      {/* HERO */}
      <section className="relative z-10 px-6 pt-24 pb-16 text-center">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 text-sm mb-8"
        >
          <Sparkles size={15} />
          AI Generated Portfolio
        </motion.div>

        {/* Avatar */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-32 h-32 rounded-full mx-auto bg-gradient-to-r from-indigo-500 to-pink-500 p-1 shadow-[0_0_50px_rgba(99,102,241,0.6)]"
        >
          <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center text-5xl font-black">
            {name.charAt(0)}
          </div>
        </motion.div>

        {/* Name */}
        <h1 className="mt-8 text-5xl md:text-7xl font-black">
          {name}
        </h1>

        {/* Summary */}
        <p className="max-w-2xl mx-auto mt-6 text-slate-400 leading-relaxed">
          {userData.summary ||
            "Creative full stack developer building modern web experiences with scalable technologies and beautiful UI."}
        </p>

        {/* Email */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
            <Mail size={18} className="text-indigo-400" />
            <span>{email}</span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="space-y-8">

            {/* Skills */}
            <div className="rounded-3xl p-7 bg-slate-900/50 border border-white/10 backdrop-blur-xl">

              <div className="flex items-center gap-3 mb-6">
                <Code className="text-indigo-400" />
                <h2 className="text-2xl font-black">
                  Skills
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {allSkills.map((skill, i) => (
                  <motion.div
                    whileHover={{
                      scale: 1.08,
                    }}
                    key={i}
                    className="px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="rounded-3xl p-7 bg-slate-900/50 border border-white/10 backdrop-blur-xl">

              <div className="flex items-center gap-3 mb-6">
                <Database className="text-pink-400" />
                <h2 className="text-2xl font-black">
                  Education
                </h2>
              </div>

              {userData.education?.map((edu, i) => (
                <div key={i} className="mb-6">

                  <h3 className="text-lg font-bold">
                    {edu.degree}
                  </h3>

                  <p className="text-indigo-400 mt-1">
                    {edu.university}
                  </p>

                  <p className="text-slate-400 text-sm mt-2">
                    {edu.startDate} - {edu.endDate}
                  </p>

                  <p className="text-slate-300 text-sm mt-2">
                    CGPA: {edu.cgpa}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-2 space-y-8">

            {/* Experience */}
            <div className="rounded-3xl p-8 bg-slate-900/50 border border-white/10 backdrop-blur-xl">

              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="text-indigo-400" />
                <h2 className="text-3xl font-black">
                  Experience
                </h2>
              </div>

              <div className="space-y-10">

                {userData.experience?.map((exp, i) => (
                  <motion.div
                    whileHover={{ x: 8 }}
                    key={i}
                    className="relative pl-8 border-l border-indigo-500/20"
                  >

                    <div className="absolute left-[-8px] top-1 w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500" />

                    <h3 className="text-2xl font-bold">
                      {exp.jobTitle}
                    </h3>

                    <p className="text-indigo-400 mt-1 font-semibold">
                      {exp.company}
                    </p>

                    <p className="text-slate-500 text-sm mt-1">
                      {exp.startDate} - {exp.endDate}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {exp.description?.map((desc, idx) => (
                        <li
                          key={idx}
                          className="text-slate-300 leading-relaxed"
                        >
                          • {desc}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="rounded-3xl p-8 bg-slate-900/50 border border-white/10 backdrop-blur-xl">

              <div className="flex items-center gap-3 mb-8">
                <Trophy className="text-pink-400" />
                <h2 className="text-3xl font-black">
                  Projects
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">

                {userData.projects?.map((proj, i) => (
                  <motion.div
                    whileHover={{
                      y: -8,
                    }}
                    key={i}
                    className="rounded-3xl p-6 bg-gradient-to-br from-slate-800/60 to-slate-900/30 border border-white/10"
                  >

                    <div className="flex justify-between items-start">

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

                    <p className="mt-4 text-slate-400 leading-relaxed text-sm">
                      {proj.description ||
                        "No description available"}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="rounded-3xl p-8 bg-slate-900/50 border border-white/10 backdrop-blur-xl">

              <div className="flex items-center gap-3 mb-8">
                <Wrench className="text-green-400" />
                <h2 className="text-3xl font-black">
                  Certifications
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-5">

                {userData.certifications?.map((cert, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-5 bg-slate-800/40 border border-white/10"
                  >
                    <h3 className="font-bold text-lg">
                      {cert.name}
                    </h3>

                    <p className="text-indigo-400 mt-2">
                      {cert.issuer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;