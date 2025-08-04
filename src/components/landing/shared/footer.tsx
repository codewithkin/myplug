"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";
import { ReactNode } from "react";

const socialLinks: { href: string; icon: ReactNode; label: string }[] = [
  {
    href: "https://github.com/codewithkin",
    icon: <Github />,
    label: "GitHub",
  },
  {
    href: "https://twitter.com/codewithkin",
    icon: <Twitter />,
    label: "X",
  },
  {
    href: "www.linkedin.com/in/kinzinzombe-183022239",
    icon: <Linkedin />,
    label: "LinkedIn",
  },
];

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Features", href: "#features" },
  { title: "Join waitlist", href: "#cta" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-t border-slate-200 dark:border-slate-700 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        {/* Brand */}
        <div className="text-2xl font-bold">
          <span className="text-blue-600 dark:text-blue-400">My</span>Plug
        </div>

        {/* Navigation links */}
        <nav className="flex space-x-8">
          {navLinks.map(({ title, href }) => (
            <Link
              key={href}
              href={href}
              className="font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              {title}
            </Link>
          ))}
        </nav>

        {/* Social links */}
        <div className="flex space-x-6">
          {socialLinks.map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <span className="w-6 h-6 inline-flex">{icon}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}