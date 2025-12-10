"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export function LeadForm() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        // Simulate generic collection or call API
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
            const res = await fetch(`${apiUrl}/api/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                setSubmitted(true);
            }
        } catch (error) {
            console.error(error);
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
                    className="mt-4"
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
                <div className="grid grid-cols-2 gap-4">
                    <Input name="phone" required placeholder="Mobile Number" type="tel" />
                    <Input name="email" required placeholder="Email Address" type="email" />
                </div>
                <div className="space-y-2">
                    <select
                        name="class"
                        className="w-full flex h-11 rounded-md border border-royal/20 bg-white px-3 py-2 text-sm text-royal focus:outline-none focus:ring-2 focus:ring-royal"
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
                    className="w-full text-lg"
                    variant="default"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit Inquiry"}
                </Button>
            </form>
        </div>
    );
}
