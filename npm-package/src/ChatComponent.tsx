"use client";
import "client-only";
import "./index.css";
import { ReactNode, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useChatStore } from "./store/chatStore";
import { Chat } from "./types";
import { ArrowUp, Loader2, MessageSquareOff, Send } from "lucide-react";

interface Props {
  chatBotName: string;
  chatBotId: string;
  website: string;
  apiKey?: string;
}

interface Message {
  role: string;
  content: string;
}

export default function ChatComponent({
  chatBotName,
  website,
  apiKey,
  chatBotId,
}: Props): ReactNode {
  // track the messages
  const [messages, setMessages] = useState<Message[]>([]);

  // Track the input
  const [input, setInput] = useState<string>("");

  // Track the error
  const [errorMessage, setError] = useState<string | null>(null);

  // Track loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [loadingMessage, setLoadingMessage] = useState<boolean>(false);

  // track the opening / closing of the dialog
  const [open, setOpen] = useState<boolean>(false);

  // Get the id of the current chat
  const { chatId, setChatId } = useChatStore();

  // handle the opening / closing of the dialog
  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const getChat = async () => {
      try {
        if (!chatId) {
          if (!chatBotId) {
            setError("Please provide the chatBotId");
            return;
          }

          // Create the chat
          const res = await axios.post(
            `http://localhost:3000/api/chat?chatBotId=${chatBotId}`
          );

          if (res.status !== 200) {
            setError("Failed to create chat");
            return;
          }

          const data = res.data as Chat;
          setChatId(data.id);
          return;
        }

        const res = await axios.get(
          `http://localhost:3000/api/chat?chatId=${chatId}`
        );

        const data = res.data as {
          chat: Chat;
          messages: Message[];
        };

        if (res.status !== 200) {
          setError("Failed to fetch chat");
          return;
        }

        // Update the messages
        setMessages(data.messages);
        return;
      } catch (e) {
        console.log("An error occured while fetching chat: ", e);
        setError("An error occured while fetching chat");
      }
    };

    const validateApiKey = async () => {
      setError(null);
      if (!apiKey) {
        setError("API key is required");
        return;
      }

      setIsLoading(true);

      try {
        const res = await axios.get(
          `http://localhost:3000/api/api-keys?apiKey=${apiKey}`
        );
        if (res.status !== 200) {
          setError("Invalid API key");
          return;
        }

        // Get the current chat
        await getChat();
      } catch (err) {
        setError("Invalid API key");
      } finally {
        setIsLoading(false);
      }
    };

    (async () => {
      await validateApiKey();
    })();
  }, []);

  const sendMessage = async ({
    message,
    chatId,
  }: {
    message: string;
    chatId?: string;
  }) => {
    try {
      setLoadingMessage(true);

      // Clear the input field
      setInput("");

      // Send the message to the backend
      const res = await axios.post(
        `http://localhost:3000/api/messages?chatId=${chatId}`,
        {
          message,
        }
      );

      if (res.status !== 200) {
        throw new Error("Failed to send message");
      }

      const data = res.data as string;

      // Add new messages
      const updatedMessages = [
        ...messages,
        { role: "user", content: message },
        { role: "assistant", content: data },
      ];

      // Limit messages to 25
      if (updatedMessages.length > 25) {
        setMessages(updatedMessages.slice(-25));
      } else {
        setMessages(updatedMessages);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingMessage(false);
    }
  };

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
            className={`flex border border-gray-300 z-[9999] flex-col bg-white rounded-xl fixed right-0 bottom-0 md:right-4 md:bottom-4 w-full md:w-1/4 h-[80vh]`}
          >
            {/* Top bar */}
            <article
              className={`flex items-center justify-between gap-2 border-b border-gray-300 p-4`}
            >
              <article className={`flex flex-col`}>
                <h2 className="text-xl text-slate-800 font-semibold">
                  {chatBotName || "MyPlugAI"}
                </h2>
                <p className="text-sm text-gray-600">
                  {website || "https://myplug.store"}
                </p>
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
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
                  borderRadius: "10px",
                }}
                className="p-4 text-center text-gray-500 bg-gray-100"
              >
                Validating API key...
              </article>
            )}
            {errorMessage && (
              <article className="p-4 text-center text-red-600 border rounded-xl border-red-600 bg-red-100 font-semibold flex flex-col items-center justfiy-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="red"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>

                <p
                  className="text-sm text-red-600"
                  style={{
                    color: "red",
                  }}
                >
                  {errorMessage}
                </p>
              </article>
            )}

            {/* Chat history */}
            {!isLoading && !errorMessage && (
              <article className="flex flex-col gap-2 w-full p-4 flex-1 overflow-y-auto">
                {messages && messages.length > 0 ? (
                  <article className="flex flex-col gap-4 w-full">
                    <AnimatePresence>
                      {messages.map((message, index: number) => (
                        <motion.article
                          key={index}
                          initial={{
                            opacity: 0,
                            x: message.role === "user" ? -50 : 50,
                          }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`${
                            message.role === "user"
                              ? "bg-blue-100 self-start"
                              : "bg-gray-100 self-end"
                          } w-4/5 p-2 rounded-xl`}
                        >
                          <p style={{
                            color: message.role === "user" ? "black" : "gray"
                          }}>{message.content}</p>
                        </motion.article>
                      ))}
                    </AnimatePresence>
                  </article>
                ) : (
                  <article className="flex flex-col gap-2 items-center justify-center">
                    <MessageSquareOff size={72} className="text-gray-500" />
                    <p className="text-sm text-gray-500">No messages yet..</p>
                  </article>
                )}
              </article>
            )}

            {/* Input area */}
            {messages.length < 25 ? (
              <article
                className={`flex items-center gap-2 border-t border-gray-300 w-full p-4`}
              >
                <input
                  style={{
                    color: "black",
                  }}
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  type="text"
                  placeholder="Ask me anything..."
                  className={`w-full placeholder:text-slate-500 py-2 pl-4 rounded-md border focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-blue-500 border-gray-300`}
                />
                <button
                  disabled={loadingMessage || isLoading}
                  onClick={async () =>
                    await sendMessage({ message: input, chatId })
                  }
                  className={`bg-blue-500 disabled:bg-blue-900 hover:bg-blue-700 transition-all duration-300 text-white p-2 rounded-md`}
                >
                  {loadingMessage ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ArrowUp className="w-4 h-4" />
                  )}
                </button>
              </article>
            ) : (
              <article className="p-4 text-center text-sm text-red-600 font-semibold border-t border-gray-300">
                We only support sending 20 consecutive messages.
              </article>
            )}
          </motion.article>
        )}
      </AnimatePresence>

      {!open && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          onClick={handleOpen}
          className={`fixed z-[9999] right-4 bottom-4 bg-white hover:bg-gray-200 transition-all duration-300 text-white p-4 rounded-full`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
            />
          </svg>
        </motion.button>
      )}
    </>
  );
}