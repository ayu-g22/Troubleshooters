import { useState } from 'react';

const FAQ = () => {
  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  const faqData = [
    {
      question: "What is DCS?",
      answer:
        "DCS stands for Driving Credit Score, a system that evaluates your driving behavior based on speed, lane changes, traffic violations, and other factors."
    },
    {
      question: "How is the score calculated?",
      answer:
        "The score is calculated using various parameters like speed, distance traveled without challans, and government data on traffic violations."
    },
    {
      question: "Can I improve my DCS?",
      answer:
        "Yes, by following traffic rules, avoiding challans, and practicing safe driving, you can gradually improve your DCS."
    },
    // Add more FAQ items here
  ];

  return (
    <div className="w-full max-w-3xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>
      {faqData.map((item, i) => (
        <div key={i} className="mb-4 border-b">
          <div
            onClick={() => toggle(i)}
            className="cursor-pointer p-4 bg-gray-100 flex justify-between items-center"
          >
            <h2 className="text-lg font-medium">{item.question}</h2>
            <span
              className={`text-2xl transform ${
                selected === i ? 'rotate-180' : ''
              } transition-transform duration-300`}
            >
              ⌄
            </span>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              selected === i ? 'max-h-40' : 'max-h-0'
            }`}
          >
            <p className="p-4 text-gray-600">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
