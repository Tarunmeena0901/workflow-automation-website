"use client"
import { useRouter } from "next/navigation"

export function AppBar() {
    const router = useRouter();
    return (
        <div className="h-15 w-full flex justify-between items-center p-4 bg-black text-white">
            <div className="font-extrabold text-2xl">
                zapier
            </div>
            <div className="flex items-center gap-4">
                <button onClick={() => router.push("/login")}>
                    login
                </button>
                <button  onClick={() => router.push("/signup")}>
                    Sign up
                </button>
            </div>
        </div>
    )
}