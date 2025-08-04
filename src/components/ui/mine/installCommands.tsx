import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import { useState } from "react";
import { toast } from "sonner";

type InstallCommands = {
  npm: string;
  yarn: string;
  pnpm: string;
  bun: string;
  deno: string;
};

export default function InstallCommandTabs({ installCommands }: { installCommands: InstallCommands }) {
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <Tabs defaultValue="npm" className="w-full max-w-xl">
      <TabsList>
        {Object.keys(installCommands).map((tool) => (
          <TabsTrigger key={tool} value={tool}>
            {tool}
          </TabsTrigger>
        ))}
      </TabsList>
      {Object.entries(installCommands).map(([tool, command]) => (
        <TabsContent key={tool} value={tool}>
          <div className="flex items-center font-semibold justify-between bg-muted p-4 rounded-md font-mono text-sm">
            <span>{command}</span>
            <TooltipProvider>
                {
                    copied ? (
<Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                        variant="ghost"
                        size="icon"
                        >
                            <Check />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Command copied to clipboard</p>
                    </TooltipContent>
                </Tooltip>
                    ) : (
                        <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            navigator.clipboard.writeText(command)
                            setCopied(true);

                            toast("Command copied to clipboard");
                        }}
                        >
                        <Copy className="w-4 h-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Copy command</p>
                    </TooltipContent>
                </Tooltip>
                    )
                }
            </TooltipProvider>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}