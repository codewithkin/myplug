"use client";

import { Code, Key, Package, UserIcon } from "lucide-react";
import { ReactNode } from "react";
import { motion } from "framer-motion";

type Step = {
  number: number;
  title: string;
  description: string;
  icon: ReactNode;
};

export default function Steps() {
  const steps: Step[] = [
    {
      number: 1,
      title: "Sign up for MyPlug",
      description: "Create your free account in just a few seconds.",
      icon: <UserIcon strokeWidth={1.4} className="w-6 h-6" />,
    },
    {
      number: 2,
      title: "Install the package",
      description: "Run `npm install myplug` to add it to your project.",
      icon: <Package strokeWidth={1.4} className="w-6 h-6" />,
    },
    {
      number: 3,
      title: "Copy your API key",
      description: "Grab your API key from the dashboard to connect.",
      icon: <Key strokeWidth={1.4} className="w-6 h-6" />,
    },
    {
      number: 4,
      title: "Add the chatbot",
      description: "Drop the MyPlug component into your code — it just works.",
      icon: <Code strokeWidth={1.4} className="w-6 h-6" />,
    },
  ];

  return (
    <section className="w-full mx-auto px-4 py-10">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-3xl font-semibold text-center mb-8 text-gray-900 dark:text-white"
      >
        Get Started in 4{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Easy Steps
        </span>
      </motion.h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-xl p-6 min-h-[300px] border border-gray-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-blue-600 text-slate-900 dark:text-white shadow-md flex flex-col justify-between gap-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-500 dark:bg-slate-800 rounded-full p-3">
                  {step.icon}
                </div>
              </div>
              <div className="bg-white text-blue-600 dark:text-blue-700 font-bold w-8 h-8 rounded-full flex items-center justify-center">
                {step.number}
              </div>
            </div>

            <article className="flex flex-col">
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400">
                {step.description}
              </p>
            </article>
          </motion.div>
        ))}
      </div>
    </section>
  );
}