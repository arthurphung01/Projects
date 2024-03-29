"use client"; // this is a client component

import { useRouter } from "next/navigation";
import { useState } from "react";
import supabase from "@/utils/supabaseClient";

export default function Login() {
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const router = useRouter();

    async function signInWithEmail() {
        try {
            if  (email && password) {
                const resp = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password,
                });
                if (resp.error) throw resp.error;
                const userId = resp.data.user?.id;
                console.log("userId: ", userId);
                router.push('/phartedd');
            }           
        } catch {}
    }
    return (

    <div className="flex flex-col w-full justify-center items-center">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
        </label>
        <div className="mt-1">
            <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-justify"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>

        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4">
            Password
        </label>
        <div className="mt-1">
            <input
                type="password"
                name="password"
                id="password"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-justify"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm mt-4 text-white hover:bg-indigo-700"
            onClick={signInWithEmail}
        >
            Log in
        </button>

    </div>
    )
}