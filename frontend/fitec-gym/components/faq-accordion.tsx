"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

type Question = {
  _id: string
  question: string
  answer: string
  category_slug: string
  category_name: string
  order?: number
}

interface FAQAccordionProps {
  questions: Question[]
}

export default function FAQAccordion({ questions }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {questions.map((question, index) => (
        <div key={question._id} className={`border-b border-gray-100 last:border-b-0`}>
          <button
            onClick={() => toggleQuestion(index)}
            className="w-full text-left p-4 flex justify-between items-center focus:outline-none"
          >
            <h3 className="font-medium text-gray-800">{question.question}</h3>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform ${
                openIndex === index ? "transform rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-96 p-4 pt-0" : "max-h-0"
            }`}
          >
            <p className="text-gray-600">{question.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
