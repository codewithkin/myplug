"use client"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ModeToggle } from "@/components/ui/theme-toggle"
import { authClient } from "@/lib/auth-client"
import { useQuery } from "@tanstack/react-query"
import { Check, Copy, Key, Trash } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import APIKeyRow from "./components/APIKeyRow"

export default function APIKeysPage() {
    // Fetch all API keys for the user
    const {data: apiKeys, isLoading: fetchingApiKeys} = useQuery({
        queryKey: ["api-keys"],
        queryFn: () => authClient.apiKey.list(),
    });

    console.log("API keys: ", apiKeys);

    return (
        <article className="flex w-full flex-col gap-4 px-4 sm:px-8 md:px-16 py-10">
            <h1 className="text-2xl font-semibold">Your API Keys</h1>

            {
                process.env.NODE_ENV === "development" && (
                    <ModeToggle />
                )
            }

            <Table className="w-full">
                <TableHeader>
                    <TableRow className="bg-gray-400 rounded-xl text-white dark:bg-slate-800 hover:bg-gray-600 text-white">
                        <TableHead className="text-white">Icon</TableHead>
                        <TableHead className="text-white">Name</TableHead>
                        <TableHead className="text-white">Key</TableHead>
                        <TableHead className="text-white">Created At</TableHead>
                        <TableHead className="text-white">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody> 
                    {!fetchingApiKeys ? (
                        apiKeys?.data && apiKeys?.data?.length > 0 ? (
                            apiKeys?.data?.map((apiKey, index: number) => {
                                return (
                                    <APIKeyRow  
                                        apiKey={apiKey}
                                        key={index}
                                    />
                                )
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    No API keys found
                                </TableCell>
                            </TableRow>
                        )
                    )
                     : (
                        <>
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    <Skeleton className="bg-gray-500 dark:bg-slate-800 h-10 w-full" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    <Skeleton className="bg-gray-500 dark:bg-slate-800 h-10 w-full" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    <Skeleton className="bg-gray-500 dark:bg-slate-800 h-10 w-full" />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    <Skeleton className="bg-gray-500 dark:bg-slate-800 h-10 w-full" />
                                </TableCell>
                            </TableRow>
                        </>
                    )}
                </TableBody>
            </Table>
        </article>
    )
}
