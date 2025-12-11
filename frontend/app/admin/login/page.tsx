"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
            const res = await fetch(`${apiUrl}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                const data = await res.json();
                // Store in localStorage
                localStorage.setItem("adminToken", data.token);
                // Store in cookies for middleware
                document.cookie = `adminToken=${data.token}; path=/; max-age=3600; SameSite=Strict`;
                router.push("/admin/leads");
            } else {
                setError("Invalid Credentials");
            }
        } catch (err) {
            setError("Connection Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-royal/10">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-royal/20">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif font-bold text-royal">Admin Login</h1>
                    <p className="text-slate-500">Indus Public School</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <Input
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <Button className="w-full bg-royal hover:bg-royal/90 text-white">
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
}
