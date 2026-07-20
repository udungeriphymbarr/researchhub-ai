import { motion } from "framer-motion";
import { FaCheckCircle, FaCrown } from "react-icons/fa";
import { Link } from "react-router-dom";

function Pricing() {
  return (
    <section
      id="pricing"
      className="py-28 bg-gradient-to-br from-blue-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="uppercase tracking-widest text-blue-600 font-bold">
            Pricing
          </span>

          <h2 className="mt-4 text-5xl font-black">Simple Pricing</h2>

          <p className="mt-6 text-gray-600 text-lg">
            Start free. Upgrade only when you're ready.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* FREE */}

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white rounded-3xl shadow-xl border p-10"
          >
            <h3 className="text-3xl font-bold">Free</h3>

            <p className="text-gray-500 mt-2">Perfect for getting started.</p>

            <div className="mt-8">
              <span className="text-6xl font-black">₦0</span>

              <span className="text-gray-500">/Forever</span>
            </div>

            <div className="mt-10 space-y-5">
              <Feature text="20 AI generations monthly" />

              <Feature text="Topic Generator" />

              <Feature text="Research Questions" />

              <Feature text="Chapter Outline" />

              <Feature text="Project Management" />
            </div>

            <Link
              to="/signup"
              className="mt-10 block text-center bg-gray-900 hover:bg-black text-white py-4 rounded-xl transition"
            >
              Start Free
            </Link>
          </motion.div>

          {/* PREMIUM */}

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-2xl text-white p-10"
          >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-5 py-2 rounded-full font-bold flex items-center gap-2">
              <FaCrown />
              Most Popular
            </div>

            <h3 className="text-3xl font-bold">Premium</h3>

            <p className="opacity-80 mt-2">Built for serious researchers.</p>

            <div className="mt-8">
              <span className="text-6xl font-black">₦3,000</span>

              <span>/month</span>
            </div>

            <div className="mt-10 space-y-5">
              <Feature text="Unlimited AI generations" />

              <Feature text="Unlimited Projects" />

              <Feature text="Generation History" />

              <Feature text="Priority AI Speed" />

              <Feature text="Future Premium Features" />
            </div>

            <Link
              to="/signup"
              className="mt-10 block text-center bg-white text-blue-700 font-bold py-4 rounded-xl hover:bg-gray-100 transition"
            >
              Upgrade Now
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-4">
      <FaCheckCircle />
      <span>{text}</span>
    </div>
  );
}

export default Pricing;
