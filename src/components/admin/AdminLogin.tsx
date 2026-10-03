"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Lock, Mail, KeyRound, Sparkles, AlertCircle, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (!result.success) {
      setError(result.error || "Login failed. Please check your credentials.");
    }
  };

  const handleUseDemo = () => {
    setEmail("admin@roopandrivaaz.com");
    setPassword("admin123");
  };

  return (
    <div className="min-h-screen bg-[#fcfaf5] flex flex-col justify-center items-center px-4 py-12">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c5902f]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7b1e3a]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex w-14 h-14 border border-[#c5902f] rounded-[50%_50%_6px_50%] -rotate-45 items-center justify-center bg-[#35141f] shadow-lg mb-2">
            <span className="rotate-45 text-[#e1bf75] font-serif font-bold text-2xl">
              R
            </span>
          </div>

          <h1 className="font-serif text-3xl font-bold tracking-wider text-[#35141f]">
            ROOP &amp; RIVAAZ
          </h1>
          <p className="text-xs uppercase tracking-widest text-[#c5902f] font-semibold">
            Admin Security &amp; Control Portal
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xs border border-[#e8ddcd] shadow-xl p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-[#f4ecdf] pb-4">
            <div className="w-8 h-8 rounded-full bg-[#f4ecdf] text-[#7b1e3a] flex items-center justify-center">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#35141f] uppercase tracking-wide">
                Authorized Access Only
              </h2>
              <p className="text-[11px] text-[#746863]">
                Enter your admin credentials to manage store &amp; orders
              </p>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#35141f] mb-1.5">
                Username or Email Address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#746863]"
                />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@roopandrivaaz.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#35141f] mb-1.5">
                Password
              </label>
              <div className="relative">
                <KeyRound
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#746863]"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#fcfaf5] border border-[#e8ddcd] text-xs text-[#261d1c] rounded-xs focus:outline-hidden focus:border-[#c5902f]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#746863] hover:text-[#35141f]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#7b1e3a] hover:bg-[#35141f] text-white text-xs font-bold uppercase tracking-widest rounded-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
            >
              {loading ? (
                <>Signing In...</>
              ) : (
                <>
                  Sign In to Dashboard <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Helper Callout */}
          <div className="bg-[#fcfaf5] p-3.5 rounded-xs border border-[#e8ddcd] text-[11px] space-y-1.5 text-[#746863]">
            <div className="flex items-center justify-between font-semibold text-[#35141f]">
              <span className="flex items-center gap-1">
                <Sparkles size={12} className="text-[#c5902f]" /> Default Master Admin:
              </span>
              <button
                type="button"
                onClick={handleUseDemo}
                className="text-[10px] text-[#7b1e3a] underline font-bold cursor-pointer hover:text-[#35141f]"
              >
                Auto-fill
              </button>
            </div>
            <p>
              Email: <code className="bg-white px-1 py-0.5 rounded-xs border border-[#e8ddcd]">admin@roopandrivaaz.com</code>
            </p>
            <p>
              Password: <code className="bg-white px-1 py-0.5 rounded-xs border border-[#e8ddcd]">admin123</code>
            </p>
            <p className="text-[10px] text-[#746863]/80 italic pt-1">
              Supports both Firebase Auth accounts and local master admin credentials.
            </p>
          </div>
        </div>

        {/* Return to storefront */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs text-[#746863] hover:text-[#7b1e3a] transition-colors underline"
          >
            ← Return to Roop &amp; Rivaaz Storefront
          </a>
        </div>
      </div>
    </div>
  );
}
