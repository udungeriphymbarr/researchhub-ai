import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaRobot,
  FaLightbulb,
  FaFolderOpen,
} from "react-icons/fa";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-100 min-h-screen flex items-center">
      {/* Background Blur */}

      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-20 items-center">
        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold">
            🚀 AI Powered Research Assistant
          </span>

          <h1 className="mt-8 text-5xl lg:text-7xl font-black leading-tight text-gray-900">
            Research
            <span className="text-blue-600"> Smarter.</span>
            <br />
            Graduate
            <span className="text-indigo-600"> Faster.</span>
          </h1>

          <p className="mt-8 text-xl leading-9 text-gray-600">
            Generate research topics, research questions, chapter outlines,
            organize projects, and finish your research in record time using
            Artificial Intelligence.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <Link
              to="/signup"
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-xl flex items-center gap-3 shadow-xl"
            >
              Get Started
              <FaArrowRight />
            </Link>

            <Link
              to="/login"
              className="bg-white hover:bg-gray-100 transition text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-xl flex items-center gap-3 shadow-xl"
            >
              Login
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-3">
              <div className="w-12 h-12 rounded-full bg-blue-500 border-4 border-white"></div>

              <div className="w-12 h-12 rounded-full bg-indigo-500 border-4 border-white"></div>

              <div className="w-12 h-12 rounded-full bg-cyan-500 border-4 border-white"></div>
            </div>

            <div>
              <p className="font-bold">Built for Students & Researchers</p>

              <p className="text-gray-500">Nigeria 🇳🇬</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="bg-blue-600 text-white p-6">
              <h2 className="text-2xl font-bold">ResearchHub Dashboard</h2>

              <p className="opacity-80">AI Workspace</p>
            </div>

            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between bg-blue-50 rounded-xl p-5">
                <div className="flex items-center gap-4">
                  <FaLightbulb className="text-blue-600 text-2xl" />
                  AI Topic Generator
                </div>
                ✅
              </div>

              <div className="flex items-center justify-between bg-indigo-50 rounded-xl p-5">
                <div className="flex items-center gap-4">
                  <FaRobot className="text-indigo-600 text-2xl" />
                  Research Questions
                </div>
                ⚡
              </div>

              <div className="flex items-center justify-between bg-cyan-50 rounded-xl p-5">
                <div className="flex items-center gap-4">
                  <FaFolderOpen className="text-cyan-600 text-2xl" />
                  My Projects
                </div>
                📂
              </div>

              <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                <h3 className="text-lg font-bold">Premium Activated</h3>

                <p className="opacity-80">Unlimited AI Generation</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
