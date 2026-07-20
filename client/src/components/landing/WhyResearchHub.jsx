import { motion } from "framer-motion";
import { FaClock, FaBrain, FaShieldAlt, FaBolt } from "react-icons/fa";

const reasons = [
  {
    icon: <FaClock />,
    title: "Save Hours of Research",
    text: "Generate topics, research questions and chapter outlines in seconds instead of spending hours searching online.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <FaBrain />,
    title: "Built for Academic Research",
    text: "Unlike generic AI tools, ResearchHub AI is designed specifically for students, lecturers and researchers.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: <FaShieldAlt />,
    title: "Keep Everything Organized",
    text: "Store projects, revisit previous generations and continue your research from one dashboard.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <FaBolt />,
    title: "Fast & Simple",
    text: "No complicated setup. Just log in, type your topic and let AI do the heavy lifting.",
    color: "from-orange-500 to-red-500",
  },
];

function WhyResearchHub() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="uppercase tracking-widest text-blue-600 font-bold">
            WHY RESEARCHHUB AI
          </span>

          <h2 className="mt-4 text-5xl font-black text-gray-900">
            Research Doesn't Have
            <br />
            To Be Difficult
          </h2>

          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            We built ResearchHub AI to remove the frustration, confusion and
            wasted time that many students experience during research.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {reasons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              whileHover={{
                scale: 1.03,
              }}
              className="rounded-3xl border p-10 hover:shadow-2xl transition"
            >
              <div
                className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-3xl`}
              >
                {item.icon}
              </div>

              <h3 className="mt-8 text-3xl font-bold">{item.title}</h3>

              <p className="mt-5 text-gray-600 leading-8">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyResearchHub;
