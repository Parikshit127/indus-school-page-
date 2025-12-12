"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils"; // Assuming you might want to use cn here later, though not strict dependency for basic form

// Basic Input Component (Defining locally for speed, or could be separate)
const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
        className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-royal",
            className
        )}
        {...props}
    />
);

// Basic Textarea Component
const Textarea = ({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea
        className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-royal",
            className
        )}
        {...props}
    />
);

export function LeadForm() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        // Add current timestamp
        const payload = { ...data, date: new Date().toISOString() };

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            const res = await fetch(`${apiUrl}/api/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setSubmitted(true);
            } else {
                console.error("Submission failed");
                alert("Failed to submit form. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("Error submitting form. Please check your connection.");
        } finally {
            setLoading(false);
        }
    }

    if (submitted) {
        return (
            <div className="bg-white/95 p-8 rounded-lg shadow-2xl text-center border-t-4 border-gold">
                <h3 className="text-2xl font-serif text-royal mb-2">Thank You!</h3>
                <p className="text-royal/80">Our admissions team will contact you shortly.</p>
                <Button
                    variant="outline"
                    className="mt-4 border-royal text-royal hover:bg-royal hover:text-white"
                    onClick={() => setSubmitted(false)}
                >
                    Submit Another
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-white/95 p-5 md:p-8 rounded-lg shadow-2xl border-t-4 border-gold">
            <h3 className="text-2xl font-serif text-royal mb-6 text-center">
                Admissions Open 2025-26
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Input name="studentName" required placeholder="Student Name" />
                </div>
                <div className="space-y-2">
                    <Input name="fatherName" required placeholder="Father's Name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Input name="city" required placeholder="City" />
                    <Input name="state" required placeholder="State" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Input name="phone" required placeholder="Mobile Number" type="tel" pattern="[0-9]{10}" title="10 digit mobile number" />
                    <Input name="email" required placeholder="Email Address" type="email" />
                </div>
                <div className="space-y-2">
                    <select
                        name="class"
                        className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-royal"
                        required
                    >
                        <option value="">Select Class</option>
                        <option value="Pre-Primary">Pre-Primary</option>
                        <option value="Primary (1-5)">Primary (1-5)</option>
                        <option value="Middle (6-8)">Middle (6-8)</option>
                        <option value="Secondary (9-10)">Secondary (9-10)</option>
                        <option value="XI Medical">XI Medical</option>
                        <option value="XI Non-Medical">XI Non-Medical</option>
                        <option value="XI Commerce">XI Commerce</option>
                        <option value="XI Arts">XI Arts</option>
                        <option value="XII Medical">XII Medical</option>
                        <option value="XII Non-Medical">XII Non-Medical</option>
                        <option value="XII Commerce">XII Commerce</option>
                        <option value="XII Arts">XII Arts</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <Textarea name="message" placeholder="Message (Optional)" />
                </div>
                <Button
                    type="submit"
                    className="w-full text-lg font-bold bg-gold hover:bg-gold/90 text-royal"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit Inquiry"}
                </Button>
            </form>
        </div>
    );
}
