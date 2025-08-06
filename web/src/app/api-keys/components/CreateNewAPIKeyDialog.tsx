import { Button } from "@/components/ui/button";
import { DialogHeader, Dialog, DialogTitle, DialogContent, DialogClose, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { queryClient } from "@/providers/QueryClientProviderWrapper";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateNewAPIKeyDialog() {
    const [apiKeyGenerated, setApiKeyGenerated] = useState(false);
    const [apiKeyCopied, setApiKeyCopied] = useState(false);
    const [apiKeyName, setApiKeyName] = useState("");
    const [apiKey, setApiKey] = useState("");

    const {mutate: createApiKey, isPending: isCreatingApiKey} = useMutation({
        mutationFn: async () => {
          const { data, error } = await authClient.apiKey.create({
            name: apiKeyName,
            expiresIn: 60 * 60 * 24 * 31, // 7 days
            prefix: "myplug_",
        });
    
        if(error) throw new Error(error.message);
    
        return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["api-keys"]});

          toast.success("API key created successfully!", {
            description: "It expires in 31 days"
          });
          
          setApiKeyGenerated(true);
          setApiKey(data.key);
        },
        onError: () => {
          toast.error("Failed to create API key");
        }
      })

    return (
        <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-fit">Create an API key</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{apiKeyGenerated ? "Save API key" : "Create an API key"}</DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="flex flex-col gap-2">
                      <span>API keys are used to authenticate your requests to the MyPlug API</span>
                      <Input placeholder="API key name" value={apiKeyName} onChange={e => setApiKeyName(e.target.value)} />
                  </DialogDescription>
                  <DialogFooter>
                    <Button className="w-full" disabled={apiKeyCopied || isCreatingApiKey} variant={apiKeyGenerated ? "outline" : "default"} onClick={() => {
                      if(apiKeyGenerated) {
                        navigator.clipboard.writeText(apiKey);
                        toast.success("API key copied to clipboard");
                        setApiKeyCopied(true);
                        setApiKeyGenerated(false);
                        setApiKeyName("");
                        setApiKey("");

                      } else {
                        createApiKey();
                      }
                    }}>  
                       {isCreatingApiKey && <Loader2 className="w-4 h-4 animate-spin" />}
                      {apiKeyGenerated ? "Copy API key" : "Create API key"} {apiKeyCopied && <CheckCircle className="w-4 h-4" />}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
    )
}