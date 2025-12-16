import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [securityCode, setSecurityCode] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            
            if (!otpSent) {
                const response = await fetch(`${apiUrl}/api/leads/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, securityCode })
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    setOtpSent(true);
                } else {
                    setError(data.error || "Invalid credentials");
                }
            } else {
                const response = await fetch(`${apiUrl}/api/leads/auth/verify-otp`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, otp })
                });

                const data = await response.json();

                if (response.ok && data.token) {
                    localStorage.setItem("adminToken", data.token);
                    navigate("/admin/dashboard");
                } else {
                    setError(data.error || "Invalid OTP");
                }
            }
        } catch (err) {
            setError("Failed to connect to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-royal-dark via-royal to-royal-light">
            <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif font-bold text-white mb-2">Admin Login</h1>
                    <p className="text-white/60 text-sm">Indus Public School Dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {!otpSent ? (
                        <>
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                                    placeholder="vishesh.singal.contact@gmail.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">Security Code</label>
                                <input
                                    type="password"
                                    value={securityCode}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '').slice(0, 8);
                                        setSecurityCode(val);
                                    }}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent tracking-widest text-center"
                                    pattern="\d{8}"
                                    title="Please enter the 8-digit security code"
                                    required
                                />
                            </div>
                        </>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                             <div className="text-center mb-6">
                                <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                                    🔐
                                </div>
                                <h3 className="text-white font-medium">Verification Required</h3>
                                <p className="text-white/60 text-sm mt-1">
                                    We've sent a 6-digit code to <br/>
                                    <span className="text-gold font-medium">{email}</span>
                                </p>
                            </div>
                            
                            <label className="block text-white/80 text-sm font-medium mb-2">Enter OTP</label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                                    setOtp(val);
                                }}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent tracking-[0.5em] text-center font-mono text-xl"
                                placeholder="000000"
                                required
                                autoFocus
                            />
                             <div className="text-center mt-4">
                                <button 
                                    type="button"
                                    onClick={() => { setOtpSent(false); setOtp(""); }}
                                    className="text-white/40 text-sm hover:text-white transition-colors"
                                >
                                    Different account?
                                </button>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-gold to-gold-light text-royal-dark font-bold rounded-lg hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 disabled:opacity-50"
                    >
                        {loading ? "Processing..." : (otpSent ? "Verify OTP" : "Sign In")}
                    </button>
                </form>

                <p className="text-center text-white/40 text-xs mt-8">
                    Protected Admin Area • Indus Public School
                </p>
            </div>
        </div>
    );
}
