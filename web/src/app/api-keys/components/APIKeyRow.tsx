import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { authClient } from "@/lib/auth-client";
import { Check, Copy, Key, Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function APIKeyRow({ apiKey }: { apiKey: any }) {
    const [isCopied, setIsCopied] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(apiKey.prefix ?? "");

        setIsCopied(true);

        toast.success("Copied to clipboard");

        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    }

    
    const handleDelete = async (keyId: string) => {
        if (isDeleting) return;

        try {
            setIsDeleting(true);
            await authClient.apiKey.delete({keyId});
            setIsDeleting(false);

            toast.success("API key deleted");
        } catch (error) {
            toast.error("Failed to delete API api key");
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <TableRow>
                                <TableCell>
                                    <article className="rounded-lg w-fit p-2 md:p-4 flex items-center justify-center bg-blue-800 text-white">
                                        <Key size={18} />
                                    </article>
                                </TableCell>
                                <TableCell>{apiKey.name}</TableCell>
                                <TableCell>{apiKey.start}</TableCell>
                                <TableCell>{apiKey.prefix}</TableCell>
                                <TableCell className="flex items-center gap-2">
                                    <Button
                                        disabled={isDeleting}
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDelete(apiKey.id)}
                                    >
                                        {
                                            isDeleting ? (
                                                <Loader2 className="animate-spin" size={16} />
                                            ) : (
                                                <Trash />
                                            )
                                        }
                                    </Button>
                                    <Button
                                        variant="default"
                                        size="icon"
                                        className={isCopied ? "bg-green-500" : "bg-blue-500"}
                                        onClick={handleCopy}
                                    >
                                        {
                                            isCopied ? (
                                                <Check
                                                    size={16}
                                                    strokeWidth={1.5}
                                                />
                                            ) : (
                                                <Copy
                                                    size={16}
                                                    strokeWidth={1.5}
                                                />
                                            )
                                        }
                                    </Button>
                                </TableCell>
                            </TableRow>
    )
}