import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "Is ResearchHub AI free?",
    answer:
      "Yes. Every new user gets a free account with up to 20 AI generations every month.",
  },
  {
    question: "What do I get with Premium?",
    answer:
      "Premium unlocks unlimited AI generations, unlimited projects, priority access to future AI tools, and premium support.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes. You can upgrade or cancel your subscription anytime from your dashboard.",
  },
  {
    question: "Is my research data safe?",
    answer:
      "Absolutely. Your projects and AI generations are stored securely and are only accessible to you.",
  },
  {
    question: "Who is ResearchHub AI for?",
    answer:
      "ResearchHub AI is built for university students, lecturers, postgraduate students, researchers, and academic professionals.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-28 bg-white">

      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center mb-20">

          <span className="uppercase tracking-widest text-blue-600 font-bold">

            FAQ

          </span>

          <h2 className="mt-4 text-5xl font-black">

            Frequently Asked Questions

          </h2>

          <p className="mt-6 text-gray-600 text-lg">

            Everything you need to know before getting started.

          </p>

        </div>

        <div className="space-y-5">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="border rounded-2xl overflow-hidden shadow-sm"
            >

              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50"
              >

                <span className="font-bold text-lg">

                  {faq.question}

                </span>

                {openIndex === index ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}

              </button>

              {openIndex === index && (

                <div className="px-6 pb-6 text-gray-600 leading-8">

                  {faq.answer}

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default FAQ;