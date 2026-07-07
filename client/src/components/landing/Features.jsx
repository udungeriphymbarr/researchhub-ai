import { motion } from "framer-motion";
import {
  FaLightbulb,
  FaQuestionCircle,
  FaBook,
  FaFolderOpen,
  FaHistory,
  FaRocket,
} from "react-icons/fa";

const features = [
  {
    icon: <FaLightbulb />,
    title: "AI Topic Generator",
    description:
      "Generate unique research topics instantly for your academic projects.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: <FaQuestionCircle />,
    title: "Research Questions",
    description:
      "Create intelligent research questions in seconds with AI.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: <FaBook />,
    title: "Chapter Outline",
    description:
      "Generate complete Chapter 1–5 outlines for your research.",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
  {
    icon: <FaFolderOpen />,
    title: "Project Manager",
    description:
      "Organize all your research projects in one secure workspace.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: <FaHistory />,
    title: "Generation History",
    description:
      "Never lose your AI work. Every generation is safely stored.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: <FaRocket />,
    title: "Premium AI",
    description:
      "Unlock unlimited AI generations with ResearchHub Premium.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="text-center mb-20"
        >
          <span className="text-blue-600 font-semibold uppercase tracking-widest">
            FEATURES
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-black text-gray-900">
            Everything You Need
          </h2>

          <p className="mt-6 text-gray-600 text-lg max-w-3xl mx-auto">
            Powerful AI tools built specifically for students,
            researchers, lecturers and academic professionals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: .5,
                delay: index * .1,
              }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="rounded-3xl border bg-white p-8 shadow-sm hover:shadow-2xl transition-all duration-300"
            >

              <div
                className={`${feature.bg} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${feature.color}`}
              >
                {feature.icon}
              </div>

              <h3 className="mt-8 text-2xl font-bold text-gray-900">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-8">
                {feature.description}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;