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
    <article className={`flex flex-col gap-4`}>
      {/* Top bar */}
      <article className={`flex flex-col gap-2 items-center border-b border-gray-400 p-4`}>
        <article style={{ display: "flex", flexDirection: "column", gap: "3px", color: "#666" }}>
          <h2 style={{
            fontSize: 24,
            fontWeight: 600,
            color: "#333",
          }}>{chatBotName || "MyPlugAI"}</h2>
          <p style={{
            fontSize: 14,
            fontWeight: 400,
            color: "#666",
          }}>{website || "https://myplug.store"}</p>
        </article>
      </article>
    </article>
  )
}