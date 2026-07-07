import { motion } from "framer-motion";
import {
  FaLightbulb,
  FaQuestionCircle,
  FaBookOpen,
  FaFolderOpen,
  FaHistory,
  FaCrown,
} from "react-icons/fa";

function Workspace() {
  return (
    <section className="py-28 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{opacity:0,y:30}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          transition={{duration:.6}}
          className="text-center mb-20"
        >

          <span className="uppercase tracking-widest text-blue-600 font-bold">

            Dashboard Preview

          </span>

          <h2 className="mt-4 text-5xl font-black text-gray-900">

            Your Entire Research
            <br />
            Workspace In One Place

          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">

            Stop switching between notebooks,
            Word documents,
            ChatGPT,
            browsers,
            and folders.

            Everything you need lives inside one dashboard.

          </p>

        </motion.div>

        <motion.div

          initial={{opacity:0,scale:.95}}
          whileInView={{opacity:1,scale:1}}
          viewport={{once:true}}
          transition={{duration:.7}}

          className="bg-white rounded-3xl shadow-2xl border overflow-hidden"

        >

          {/* Header */}

          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 flex justify-between items-center">

            <div>

              <h3 className="text-2xl font-bold">

                ResearchHub Dashboard

              </h3>

              <p className="opacity-80">

                AI Workspace

              </p>

            </div>

            <div className="bg-green-500 px-4 py-2 rounded-full">

              Premium

            </div>

          </div>

          {/* Content */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">

            <Card
              icon={<FaLightbulb />}
              title="AI Topic Generator"
              color="blue"
            />

            <Card
              icon={<FaQuestionCircle />}
              title="Research Questions"
              color="indigo"
            />

            <Card
              icon={<FaBookOpen />}
              title="Chapter Outline"
              color="cyan"
            />

            <Card
              icon={<FaFolderOpen />}
              title="Projects"
              color="green"
            />

            <Card
              icon={<FaHistory />}
              title="History"
              color="orange"
            />

            <Card
              icon={<FaCrown />}
              title="Premium AI"
              color="purple"
            />

          </div>

        </motion.div>

      </div>

    </section>
  );
}

function Card({icon,title,color}){

const colors={
blue:"bg-blue-100 text-blue-600",
indigo:"bg-indigo-100 text-indigo-600",
cyan:"bg-cyan-100 text-cyan-600",
green:"bg-green-100 text-green-600",
orange:"bg-orange-100 text-orange-600",
purple:"bg-purple-100 text-purple-600",
}

return(

<motion.div

whileHover={{
y:-8,
}}

className="rounded-2xl border p-8 hover:shadow-xl transition"

>

<div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${colors[color]}`}>

{icon}

</div>

<h3 className="mt-6 text-xl font-bold">

{title}

</h3>

<p className="mt-3 text-gray-500 leading-7">

Powerful AI assistance built specifically for academic research.

</p>

</motion.div>

)

}

export default Workspace;