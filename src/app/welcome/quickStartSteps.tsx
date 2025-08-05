"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { CheckCircle, FileText, Home, Loader2, Upload, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import InstallCommandTabs from "@/components/ui/mine/installCommands";
import { useDropzone } from "react-dropzone";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { convertBytesTo } from "@/helpers/convertBytesTo";
import axios from "axios";

export default function QuickStartSteps() {
  const [currentStep, setCurrentStep] = useState(2);
  const [chatbotName, setChatbotName] = useState("");
  const [chatbotDesc, setChatbotDesc] = useState("");
  const [chatbotPurpose, setChatbotPurpose] = useState("");
  const [chatbotWebsiteUrl, setChatbotWebsiteUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const installCommands = {
    npm: "npm install myplug",
    yarn: "yarn add myplug",
    pnpm: "pnpm add myplug",
    bun: "bun add myplug",
    deno: "deno add myplug",
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    console.log(acceptedFiles);
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  const { mutate: createChatbot, isPending } = useMutation({
    mutationFn: async () => {
      if(file) {
        const bytes = await file?.arrayBuffer();
      const buffer = await Buffer.from(bytes);

      const res = await axios.post("/api/chatbot", {
        name: chatbotName,
        purpose: chatbotPurpose,
        websiteUrl: chatbotWebsiteUrl,
        dataFile: buffer
      });

      if (res.status !== 200) throw new Error("Failed to create chatbot");

      return res.data;
      }
    },
    onSuccess: () => {
      toast.success("Chatbot created successfully!");
      setCurrentStep(5);
    },
    onError: () => {
      toast.error("Failed to create chatbot");
    },
  });

  return (
    <article className="w-full flex flex-col gap-4">
        {
            process.env.NODE_ENV === "development" && (
                <ModeToggle />
            )
        }
      <Accordion type="single" collapsible className="w-full" value={`item-${currentStep}`}> 
        <AccordionItem className="border border-gray-300 px-4 rounded-xl mb-4" value="item-1">
          <AccordionTrigger>Create an account</AccordionTrigger>
          <AccordionContent>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-muted-foreground">You're already signed up!</p>
              <Button onClick={() => setCurrentStep(2)} className="mt-4">
                Mark as done
              </Button>
            </motion.div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem className="border border-gray-300 px-4 rounded-xl mb-4" value="item-2">
          <AccordionTrigger>Install the MyPlug npm package</AccordionTrigger>
          <AccordionContent>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <InstallCommandTabs installCommands={installCommands} />
              <Button onClick={() => setCurrentStep(3)}>Mark as done</Button>
            </motion.div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem className="border border-gray-300 px-4 rounded-xl mb-4" value="item-3">
          <AccordionTrigger>Get your API key</AccordionTrigger>
          <AccordionContent>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <p>Visit your <Link href="/settings/api-keys" className="text-blue-500 underline">API Keys</Link> page to get your key.</p>
              <Button onClick={() => setCurrentStep(4)}>Mark as done</Button>
            </motion.div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem className="border border-gray-300 px-4 rounded-xl mb-4" value="item-4">
          <AccordionTrigger>Create your first chatbot</AccordionTrigger>
          <AccordionContent>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 p-2 md:p-4">
              <Input placeholder="Chatbot name" value={chatbotName} onChange={e => setChatbotName(e.target.value)} />
              <Textarea placeholder="What does this chatbot do?" value={chatbotPurpose} onChange={e => setChatbotPurpose(e.target.value)} />
              <Input placeholder="Website URL" value={chatbotWebsiteUrl} onChange={e => setChatbotWebsiteUrl(e.target.value)} />
              <div className={`px-4 py-20 flex flex-col justify-center items-center border-2 rounded-xl border-dashed border-gray-400 ${isDragActive && "bg-blue-100 border-blue-500 dark:bg-blue-800 dark:border-blue-800"}`} {...getRootProps()}>
      <input {...getInputProps()} />
      {
        <>
        { isDragActive ?
          (
            <article className="flex flex-col gap-4 items-center justify-center text-center">
                <article className="flex flex-col gap-2 justify-center items-center">
                    <article className="p-4 rounded-full bg-blue-500 w-fit text-white">
                        <Upload size={24} />
                    </article>
                    <p className="text-lg font-semibold">Drop the files here ...</p>
                    <p className="text-sm">Drag 'n' drop some files here, or click to select files</p>
                </article>
            </article>
          ) : (
            <article className="flex flex-col gap-2 justify-center items-center text-center">
                           <article className="p-4 rounded-full bg-gray-500 w-fit text-white">
                            <Upload size={24} />
                        </article>
                        <p className="font-semibold">Drag 'n' drop some files here, or click to select files</p>
            </article>
          )}
          </>
      }
    </div>

              <article className="flex flex-col gap-4">
                {
                    file && (
                        <article className="flex p-4 items-center justify-between rounded-md dark:bg-slate-800 bg-gray-100">

                            <article className="flex items-center gap-2">
                                {/* Icon for file type */}
                                <article className="p-2 rounded-full bg-blue-200 dark:bg-blue-900 w-fit text-white">
                                    <FileText className="text-blue-500" strokeWidth={1.5} size={32} />
                                </article>
                            <article className="flex flex-col capitalize">
                          <h3 className="font-semibold text-lg">{file.name}</h3>
                          <p className="text-sm text-gray-400 dark:text-slate-500">{convertBytesTo({
                            bytes: file.size,
                            unit: "KB"
                          })} KB</p>
                            </article>
                            </article>

                          <Button onClick={() => setFile(null)} variant="ghost" size="icon">
                            <X />
                          </Button>
                        </article>
                    )
                }
              </article>

              <Button onClick={() => createChatbot()} disabled={isPending || !file || !chatbotName || !chatbotPurpose || !chatbotWebsiteUrl}>
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                {isPending ? "Creating your chatbot..." : "Create Chatbot"}
              </Button>
            
            </motion.div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem className="border border-gray-300 px-4 rounded-xl mb-4" value="item-5">
          <AccordionTrigger>Use your chatbot</AccordionTrigger>
          <AccordionContent>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <pre className="bg-muted p-4 rounded whitespace-pre-wrap">
{`<MyPlugAI apiKey={API_KEY} />`}
              </pre>
              <Button onClick={() => setCurrentStep(6)}>Mark as done</Button>
            </motion.div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem className="border border-gray-300 px-4 rounded-xl mb-4" value="item-6">
          <AccordionTrigger>That's it!</AccordionTrigger>
          <AccordionContent>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-green-600 font-semibold text-lg">You're all set ! 🎉</p>
              <article className="flex items-center gap-2">
                <Button className="mt-4" asChild>
                    <Link href="/dashboard">
                       <Home />
                       Go to Dashboard
                    </Link>
                </Button>
              </article>
            </motion.div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </article>
  );
}