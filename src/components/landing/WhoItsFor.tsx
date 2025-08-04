"use client";

import {
  Code2,
  Users,
  Brush,
  Headset,
  BarChart,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";

const personas = [
  {
    icon: Code2,
    title: "Solo Developers",
    description: "Add a full-featured chatbot without managing backend logic.",
  },
  {
    icon: Users,
    title: "Startups & Teams",
    description: "Ship support faster with minimal engineering effort.",
  },
  {
    icon: Headset,
    title: "Support Teams",
    description: "Provide instant answers with an AI chatbot that scales.",
  },
  {
    icon: BarChart,
    title: "Marketers",
    description: "Understand your users better with built-in analytics.",
  },
  {
    icon: Globe,
    title: "Agencies",
    description: "Deploy custom solutions for clients — quickly and reliably.",
  },
];

export default function WhoItsForSection() {
  return (
    <section className="w-full px-4 py-24 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-gray-900 dark:text-white"
        >
          Who It's{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            For
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg mt-4 text-gray-600 dark:text-gray-400"
        >
          MyPlug is flexible enough to fit into any team, workflow, or tech stack.
        </motion.p>
      </div>

      <div className="relative border-l-2 border-blue-600 dark:border-blue-500 max-w-3xl mx-auto space-y-12">
        {personas.map((persona, index) => (
          <motion.div
            key={persona.title}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative pl-10 group transition-all duration-300"
          >
            {/* Dot + Icon */}
            <div className="absolute -left-[14px] top-1.5 bg-blue-600 dark:bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center transition-colors group-hover:bg-purple-600">
              <persona.icon className="w-3.5 h-3.5 text-white" />
            </div>

            {/* Title + Description */}
            <div className="rounded-md px-3 py-2 transition-colors group-hover:bg-blue-50 dark:group-hover:bg-slate-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400">
                {persona.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-md group-hover:text-gray-800 dark:group-hover:text-gray-300">
                {persona.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}