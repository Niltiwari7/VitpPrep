import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const FAQ_DATA = [
  {
    question: "What is Vitprep?",
    answer: "Vitprep is a comprehensive platform designed to help students prepare for campus placements. It provides curated learning paths, practice problems, and aptitude tests."
  },
  {
    question: "Is Vitprep free to use?",
    answer: "Yes! This website is completely free. It compiles all important content and resources you'll need during your placement journey."
  },
  {
    question: "What programming language is used in explanations?",
    answer: "The site is language-independent. However, some core concepts like OOPs are explained using C++ for better clarity."
  },
  {
    question: "How often is new content added?",
    answer: "New content is added regularly. The website is continuously being updated to ensure it becomes a one-stop solution for placement prep."
  },
  {
    question: "Can I contribute to Vitprep?",
    answer: "Yes! This project will be open-source soon. Anyone can contribute by improving content, fixing errors, or adding valuable resources."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-6">
          {FAQ_DATA.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 focus:outline-none"
                aria-expanded={openIndex === index}
                aria-controls={`faq-${index}`}
              >
                <h3 className="text-lg font-semibold text-left text-gray-800 dark:text-gray-100">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  className="ml-4"
                >
                  <svg
                    className="w-6 h-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-6 pt-2 border-t border-gray-100 dark:border-gray-700"
                  >
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Still have questions?
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;