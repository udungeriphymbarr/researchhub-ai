import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Final Year Student",
    role: "University Student",
    quote:
      "ResearchHub AI drastically reduced the time I spent brainstorming research topics and organizing my project.",
  },
  {
    name: "Academic Researcher",
    role: "Research Professional",
    quote:
      "The chapter outline generator gave me a clear structure that helped me start writing much faster.",
  },
  {
    name: "Lecturer",
    role: "Higher Institution",
    quote:
      "A promising platform that helps students focus more on quality research rather than struggling to get started.",
  },
];

function Testimonials() {
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
            Testimonials
          </span>

          <h2 className="mt-4 text-5xl font-black text-gray-900">
            Built For Researchers
          </h2>

          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            ResearchHub AI is designed to help students,
            lecturers and researchers complete projects faster
            with the assistance of Artificial Intelligence.
          </p>

        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item,index)=>(

            <motion.div
              key={index}
              initial={{opacity:0,y:40}}
              whileInView={{opacity:1,y:0}}
              viewport={{once:true}}
              transition={{
                duration:.6,
                delay:index*.15
              }}
              whileHover={{
                y:-8
              }}
              className="bg-white rounded-3xl shadow-lg p-8"
            >

              <div className="flex gap-1 text-yellow-400 mb-6">

                <FaStar/>
                <FaStar/>
                <FaStar/>
                <FaStar/>
                <FaStar/>

              </div>

              <p className="text-gray-600 leading-8 italic">

                "{item.quote}"

              </p>

              <div className="mt-8">

                <h3 className="font-bold text-xl">

                  {item.name}

                </h3>

                <p className="text-gray-500">

                  {item.role}

                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Testimonials;