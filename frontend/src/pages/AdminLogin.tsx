import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [securityCode, setSecurityCode] = useState("");
    const [otp, setOtp] = useState("");
    const [_otpSent, setOtpSent] = useState(false); // NOTE: OTP flow disabled for testing; this flag is no longer used
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetOtpSent, setResetOtpSent] = useState(false);
    const [resetOtpVerified, setResetOtpVerified] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

            // Single-step admin login (OTP flow disabled for testing)
            const response = await fetch(`${apiUrl}/api/leads/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, securityCode })
            });

            const data = await response.json();

            if (response.ok && data.token) {
                localStorage.setItem("adminToken", data.token);
                navigate("/admin/dashboard");
            } else {
                setError(data.error || "Invalid credentials");
            }
        } catch (err) {
            setError("Failed to connect to server");
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

            if (!resetOtpSent) {
                // Request OTP
                const response = await fetch(`${apiUrl}/api/leads/auth/forgot-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });

                const data = await response.json();

                if (response.ok) {
                    setResetOtpSent(true);
                    setSuccessMessage("OTP sent to your email");
                } else {
                    setError(data.error || "Failed to send OTP");
                }
            } else if (!resetOtpVerified) {
                // Verify OTP
                const response = await fetch(`${apiUrl}/api/leads/auth/verify-reset-otp`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, otp })
                });

                const data = await response.json();

                if (response.ok) {
                    setResetOtpVerified(true);
                    setSuccessMessage("OTP verified! Enter your new password");
                } else {
                    setError(data.error || "Invalid OTP");
                }
            } else {
                // Reset password
                if (newPassword !== confirmPassword) {
                    setError("Passwords do not match");
                    setLoading(false);
                    return;
                }

                if (newPassword.length < 6) {
                    setError("Password must be at least 6 characters");
                    setLoading(false);
                    return;
                }

                const response = await fetch(`${apiUrl}/api/leads/auth/reset-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, otp, newPassword })
                });

                const data = await response.json();

                if (response.ok) {
                    setSuccessMessage("Password reset successful! Redirecting to login...");
                    setTimeout(() => {
                        setShowForgotPassword(false);
                        setResetOtpSent(false);
                        setResetOtpVerified(false);
                        setOtp("");
                        setNewPassword("");
                        setConfirmPassword("");
                        setPassword("");
                    }, 2000);
                } else {
                    setError(data.error || "Failed to reset password");
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
                    <h1 className="text-3xl font-serif font-bold text-white mb-2">
                        {showForgotPassword ? "Reset Password" : "Admin Login"}
                    </h1>
                    <p className="text-white/60 text-sm">Indus Public School Dashboard</p>
                </div>

                {!showForgotPassword ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* OTP-based two-step login UI disabled for testing; keeping code for future use */}
                        {/* {!otpSent ? ( */}
                        <>
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                                    placeholder="contact@gmail.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent pr-10"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                                    >
                                        {showPassword ? "👁️" : "👁️‍🗨️"}
                                    </button>
                                </div>
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
                        {/* ) : (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                                <div className="text-center mb-6">
                                    <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                                        🔐
                                    </div>
                                    <h3 className="text-white font-medium">Verification Required</h3>
                                    <p className="text-white/60 text-sm mt-1">
                                        We've sent a 6-digit code to <br />
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
                        )} */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-gold to-gold-light text-royal-dark font-bold rounded-lg hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 disabled:opacity-50"
                        >
                            {loading ? "Processing..." : "Sign In"}
                        </button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForgotPassword(true);
                                    setError("");
                                    setOtpSent(false);
                                }}
                                className="text-white/60 text-sm hover:text-gold transition-colors"
                            >
                                Forgot Password?
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleForgotPassword} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {successMessage && (
                            <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg text-sm">
                                {successMessage}
                            </div>
                        )}

                        {!resetOtpSent ? (
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                                    placeholder="contact@gmail.com"
                                    required
                                />
                                <p className="text-white/40 text-xs mt-2">
                                    Enter your admin email to receive a password reset OTP
                                </p>
                            </div>
                        ) : !resetOtpVerified ? (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                                <div className="text-center mb-6">
                                    <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                                        📧
                                    </div>
                                    <h3 className="text-white font-medium">Check Your Email</h3>
                                    <p className="text-white/60 text-sm mt-1">
                                        OTP sent to <span className="text-gold font-medium">{email}</span>
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
                            </div>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-4">
                                <div className="text-center mb-6">
                                    <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                                        🔑
                                    </div>
                                    <h3 className="text-white font-medium">Set New Password</h3>
                                    <p className="text-white/60 text-sm mt-1">
                                        Choose a strong password
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">New Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent pr-10"
                                            placeholder="••••••••"
                                            required
                                            minLength={6}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                                        >
                                            {showPassword ? "👁️" : "👁️‍🗨️"}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">Confirm Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent pr-10"
                                            placeholder="••••••••"
                                            required
                                            minLength={6}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                                        >
                                            {showPassword ? "👁️" : "👁️‍🗨️"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-gold to-gold-light text-royal-dark font-bold rounded-lg hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 disabled:opacity-50"
                        >
                            {loading ? "Processing..." : (
                                !resetOtpSent ? "Send OTP" :
                                    !resetOtpVerified ? "Verify OTP" :
                                        "Reset Password"
                            )}
                        </button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForgotPassword(false);
                                    setResetOtpSent(false);
                                    setResetOtpVerified(false);
                                    setError("");
                                    setSuccessMessage("");
                                    setOtp("");
                                    setNewPassword("");
                                    setConfirmPassword("");
                                }}
                                className="text-white/60 text-sm hover:text-gold transition-colors"
                            >
                                Back to Login
                            </button>
                        </div>
                    </form>
                )}

                <p className="text-center text-white/40 text-xs mt-8">
                    Protected Admin Area • Indus Public School
                </p>
            </div>
        </div>
    );
}
