import { FaFacebook, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo */}

          <div>
            <h2 className="text-3xl font-black text-white">ResearchHub AI</h2>

            <p className="mt-6 leading-8">
              Your intelligent academic research assistant. Generate research
              topics, research questions, chapter outlines, manage projects, and
              finish your research faster.
            </p>
          </div>

          {/* Product */}

          <div>
            <h3 className="text-white font-bold text-xl mb-6">Product</h3>

            <ul className="space-y-4">
              <li>
                <a href="#features">Features</a>
              </li>

              <li>
                <a href="#pricing">Pricing</a>
              </li>

              <li>
                <Link to="/login">Login</Link>
              </li>

              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}

          <div>
            <h3 className="text-white font-bold text-xl mb-6">Resources</h3>

            <ul className="space-y-4">
              <li>Documentation</li>

              <li>Help Center</li>

              <li>Privacy Policy</li>

              <li>Terms of Service</li>
            </ul>
          </div>

          {/* Contact */}

          {/* Contact */}

          <div>
            <h3 className="text-white font-bold text-xl mb-6">Contact</h3>

            <div className="space-y-5">
              <a
                href="mailto:researchhubai.ng@gmail.com"
                className="block hover:text-white transition"
              >
                📧 Email Us
              </a>

              <a
                href="https://wa.me/2348057663703"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-white transition"
              >
                💬 WhatsApp Us
              </a>

              <p>Calabar, Cross River, Nigeria</p>
            </div>

            <div className="flex gap-5 mt-8 text-2xl">
              <a
                href="https://www.facebook.com/udungeri.phymbarrphynaldo"
                className="hover:text-white transition"
              >
                <FaFacebook />
              </a>

              <a
                href="https://www.linkedin.com/in/udungeri-phymbarr-137404400"
                className="hover:text-white transition"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://www.instagram.com/talentz_of_god"
                className="hover:text-white transition"
              >
                <FaInstagram />
              </a>

              <a
                href="https://github.com/udungeriphymbarr"
                className="hover:text-white transition"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p>
            © {new Date().getFullYear()} ResearchHub AI. All Rights Reserved.
          </p>

          <p>Designed & Developed by TeeTechs</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
