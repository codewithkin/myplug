"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, Bot, BarChart3, Settings2, LayoutGrid } from "lucide-react";

const features = [
  {
    icon: <Zap className="w-8 h-8 text-blue-600" />,
    title: "Blazing Fast Setup",
    description: "Integrate MyPlug in under 2 minutes with a few lines of code.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-purple-600" />,
    title: "Enterprise-Grade Security",
    description: "Secure APIs and data handling you can trust — right out of the box.",
  },
  {
    icon: <Bot className="w-8 h-8 text-green-600" />,
    title: "AI Chatbot Ready",
    description: "Embed an intelligent chatbot that just works — no training required.",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-pink-600" />,
    title: "Built-in Analytics",
    description: "See exactly how your users interact, in real-time.",
  },
  {
    icon: <Settings2 className="w-8 h-8 text-orange-600" />,
    title: "Fully Customizable",
    description: "Easily match the chatbot UI to your app's look and feel.",
  },
  {
    icon: <LayoutGrid className="w-8 h-8 text-yellow-600" />,
    title: "Modular by Design",
    description: "Use only the pieces you need — nothing more.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full px-4 py-20 bg-gray-50 dark:bg-[#0b0b0e]">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-gray-900 dark:text-white"
        >
          Powerful Features, <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Built for Developers
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg mt-4 text-gray-600 dark:text-gray-400"
        >
          Everything you need to integrate, customize, and scale — with no fluff.
        </motion.p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex items-start gap-4 p-6 rounded-xl bg-white dark:bg-[#111112] shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="flex-shrink-0">{feature.icon}</div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}