'use client';

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInOut() {
    const { auth, setAuth } = useAuth();
    const router = useRouter();

    const logout = () => {
        setAuth(null);
        router.push("/login");
    }

    return (
        <div>
            {
                auth ? (
                    <>
                        <span>Hello, {auth?.name}</span>
                        <span className="px-2">|</span>
                        <a className="cursor-pointer" onClick={logout}>Logout</a>
                    </>
                ) : (
                    <Link href="/login">Login</Link>
                )
            }
        </div>
    )
}
