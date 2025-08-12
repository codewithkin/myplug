"use client";
import "client-only";
import "./index.css";
import { ReactNode, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface Props {
  chatBotName: string;
  website: string;
  apiKey?: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatComponent({ chatBotName, website, apiKey }: Props): ReactNode {
  // track the messages
  const [messages, setMessages] = useState<Message[]>([]);

  // Track the error
  const [errorMessage, setError] = useState<string | null>(null);

  // Track loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // track the opening / closing of the dialog
  const [open, setOpen] = useState<boolean>(false);

  // handle the opening / closing of the dialog
  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const validateApiKey = async () => {
      setError(null); 
      if (!apiKey) {
        setError("API key is required");
        return;
      }
      setIsLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/api/api-keys?apiKey=${apiKey}`);
        if (res.status !== 200) {
          setError("Invalid API key");
        }
      } catch (err) {
        setError("Invalid API key");
      } finally {
        setIsLoading(false);
      }
    };

    (async () => {
      await validateApiKey();
    })();

  }, [apiKey]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.article
            key="chat-article"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`flex border border-gray-300 w-[500px] z-40 flex-col bg-white rounded-xl fixed right-4 bottom-4 gap-4`}
          >
            {/* Top bar */}
            <article className={`flex items-center justify-between gap-2 border-b border-gray-300 p-4`}>
              <article className={`flex flex-col`}>
                <h2 className="text-xl text-slate-800 font-semibold">
                  {chatBotName || "MyPlugAI"}
                </h2>
                <p className="text-sm text-gray-600">{website || "https://myplug.store"}</p>
              </article>

              <button
                onClick={handleOpen}
                className={`bg-blue-100 hover:cursor-pointer hover:bg-blue-300 transition-all duration-300 text-blue-800 p-2 rounded-full`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke=" rgb(30 64 175 / var(--tw-text-opacity, 1))"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </article>

            {/* Show loading or error states */}
            {isLoading && (
              <article 
              style={{
                backgroundColor: "lightgray",
                color: "gray",
                border: "1px solid lightgray",
                padding: "10px",
                margin: "10px",
                borderRadius: "10px"
              }}
              className="p-4 text-center text-gray-500 bg-gray-100">Validating API key...</article>
            )}
            {errorMessage && (
              <article className="p-4 text-center text-red-600 border rounded-xl border-red-600 bg-red-100 font-semibold flex flex-col items-center justfiy-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>

                <p className="text-sm text-red-600" style={{
                  color: "red"
                }}>{errorMessage}</p>
              </article>
            )}

            {/* Chat history */}
            {!isLoading && !errorMessage && (
              <article className={`flex flex-col gap-2 w-full p-4`}>
                <article className={`flex flex-col gap-2`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="lightgray"
                    className="w-12 h-12"
                  >
                    <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
                    <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
                  </svg>

                  <p className="text-sm text-slate-500">No messages yet..</p>
                </article>
              </article>
            )}

            {/* Search input and submit btn */}
            <article className={`flex items-center gap-2 border-t border-gray-300 w-full p-4`}>
              <input
                style={{
                  color: "black"
                }}
                type="text"
                placeholder="Ask me anything..."
                className={`w-full placeholder:text-slate-500 py-2 pl-4 rounded-md border focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-blue-500 border-gray-300`}
              />
              <button
                className={`bg-blue-500 hover:bg-blue-700 transition-all duration-300 text-white p-2 rounded-md`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
              </button>
            </article>
          </motion.article>
        )}
      </AnimatePresence>

      {!open && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          onClick={handleOpen}
          className={`fixed z-40 right-4 bottom-4 bg-white hover:bg-gray-200 transition-all duration-300 text-white p-4 rounded-full`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
          </svg>
        </motion.button>
      )}
    </>
  );
}