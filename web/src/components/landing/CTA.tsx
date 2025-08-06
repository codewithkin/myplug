"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";

export default function CtaSection() {
  const [email, setEmail] = useState("");

  const waitlistMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/waitlist", { email });

      return res.data;
    },
    onSuccess: () => {
      toast.success("🎉 You've been added to the waitlist!");
      setEmail("");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message || "Something went wrong. Please try again.");
    },
  });

  return (
    <section id="cta" className="w-full bg-gradient-to-br from-blue-600 to-purple-700 py-24 px-6 text-white">
      <div className="mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-8"
        >
          Be Among the First to Try MyPlug
        </motion.h2>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={(e) => {
            e.preventDefault();
            waitlistMutation.mutate();
          }}
          className="flex flex-col justify-center items-center bg-transparent w-full border border-white/20 dark:bg-gray-500 backdrop-blur-xl p-4 rounded-xl sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto"
        >
          <article className="flex flex-col gap-4 bg-transparent backdrop-blur-xl rounded-md p-4 w-full">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-white/90 mb-8"
            >
              MyPlug is almost ready. Join the waitlist and get notified as soon as we launch.
            </motion.p>

            <article className="flex items-center gap-2 w-full justify-center">
              <div className="relative w-full sm:w-auto flex">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-md py-3 pl-10 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={waitlistMutation.isPending}
                className="bg-white text-blue-600 py-4 font-semibold hover:bg-white/90 transition shadow-md"
              >
                {waitlistMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </Button>
            </article>
          </article>
        </motion.form>
      </div>
    </section>
  );
}