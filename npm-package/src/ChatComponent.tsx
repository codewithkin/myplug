"use client";

import "client-only";
import "./index.css";
import { ReactNode } from "react";

interface Props {
  chatBotName: string;
  website: string;
}

export default function ChatComponent({ chatBotName, website }: Props): ReactNode {
  return (
    <article className={`flex border border-gray-300 md:w-1/4 z-40 flex-col bg-white rounded-xl fixed right-4 bottom-4 gap-4`}>
      {/* Top bar */}
      <article className={`flex flex-col gap-2 border-b border-gray-300 p-4`}>
        <article className={`flex flex-col`}>
          <h2 className="text-xl text-slate-800 font-semibold">{chatBotName || "MyPlugAI"}</h2>
          <p className="text-sm text-gray-500 text-gray-500">{website || "https://myplug.store"}</p>
        </article>
      </article>

      {/* Chat history */}
      <article className={`flex flex-col gap-2 w-full p-4`}>
        <article className={`flex flex-col gap-2`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="lightgray" className="w-12 h-12">
            <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
            <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
          </svg>
          
          <p className="text-sm text-gray-500">No messages yet..</p>
        </article>
      </article>

      {/* Search input and submit btn */}
      <article className={`flex items-center gap-2 border-t border-gray-300 w-full p-4`}>
        <input type="text" placeholder="Ask me anything..." className={`w-full w-1/4 p-2 rounded-md border focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-blue-500 border-gray-300`} />
        <button className={`bg-blue-500 hover:bg-blue-700 transition-all duration-300 text-white p-2 rounded-md`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </article>
    </article>
  )
}