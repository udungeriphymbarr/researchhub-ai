import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-[40px] overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white p-12 md:p-20 relative"
        >
          {/* Background Blur */}

          <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-20 -left-20"></div>

          <div className="absolute w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl -bottom-20 -right-20"></div>

          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              Ready To Finish
              <br />
              Your Research Faster?
            </h2>

            <p className="mt-8 text-xl opacity-90 max-w-3xl mx-auto leading-9">
              Join students, lecturers and researchers using Artificial
              Intelligence to generate topics, research questions, chapter
              outlines, manage projects and save countless hours.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
              <Link
                to="/signup"
                className="bg-white text-blue-700 px-10 py-4 rounded-xl font-bold hover:scale-105 transition"
              >
                Start Free Today
              </Link>

              <Link
                to="/login"
                className="border-2 border-white px-10 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-700 transition"
              >
                Login
              </Link>
            </div>

            <p className="mt-8 opacity-80">
              No Credit Card Required • Free Forever Plan Available
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTA;
