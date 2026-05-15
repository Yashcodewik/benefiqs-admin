"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import {
  RiArrowRightLine,
  RiShieldCheckLine,
} from "react-icons/ri";

export default function LoginComponent() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Simulate auth — replace with real API call
    setTimeout(() => {
      if (email === "admin@benefiqs.com" && password === "admin123") {
        router.push("/dashboard");
      } else {
        setError("Invalid email or password. Please try again.");
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-dark-navy relative overflow-hidden px-4 py-8 flex items-center justify-center">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(#1e2a40_1px,transparent_1px),linear-gradient(90deg,#1e2a40_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="absolute inset-x-0 top-0 h-36 bg-surface/40 border-b border-border-color/70" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-deep-blue/5 border-t border-border-color/50" />

      <section className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl border border-border-color bg-surface shadow-card grid lg:grid-cols-[minmax(0,1fr)_440px]">
        <div className="hidden lg:flex flex-col justify-between border-r border-border-color bg-dark-navy/50 p-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-12 w-44 rounded-xl border border-border-color bg-surface/80 px-3 py-2 shadow-glow-blue flex items-center">
                <Image
                  src="/logo.png"
                  alt="Benefiqs"
                  width={1300}
                  height={312}
                  priority
                  className="h-full w-full object-contain"
                />
              </div>
            
            </div>

            <div className="mt-16 max-w-md">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-3 py-1 text-teal text-xs font-medium">
                <RiShieldCheckLine className="text-sm" />
                Secure administrator access
              </div>
              <h1 className="mt-6 text-3xl font-bold leading-tight text-white">
                Manage users, plans, and content from one focused workspace.
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-text-muted">
                Sign in to continue to the Benefiqs admin dashboard.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              ["12.8k", "Users"],
              ["4.2k", "Plans"],
              ["138", "Articles"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-xl border border-border-color bg-surface/70 p-4">
                <p className="text-white text-xl font-bold">{value}</p>
                <p className="text-text-muted text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="lg:hidden flex flex-col items-center text-center mb-8">
            <div className="h-14 w-48 rounded-2xl border border-border-color bg-dark-navy px-4 py-2 shadow-glow-blue flex items-center justify-center mb-4">
              <Image
                src="/logo.png"
                alt="Benefiqs"
                width={1300}
                height={312}
                priority
                className="h-full w-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Benefiqs Admin</h1>
            <p className="text-text-muted text-sm mt-1">Sign in to manage your platform</p>
          </div>

          <div className="mb-8 hidden lg:block">
            <p className="text-teal text-xs font-semibold uppercase tracking-[0.18em]">Welcome back</p>
            <h2 className="text-white text-2xl font-bold mt-2">Sign in to Benefiqs Admin</h2>
            <p className="text-text-muted text-sm mt-2">Use your admin credentials to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-danger/10 border border-danger/30 text-danger text-sm rounded-xl px-4 py-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-danger flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-text-muted mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-lg" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@benefiqs.com"
                  required
                  className="w-full h-12 bg-dark-navy border border-border-color rounded-xl pl-11 pr-4 text-white text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-lg" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full h-12 bg-dark-navy border border-border-color rounded-xl pl-11 pr-12 text-white text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-teal hover:bg-white/5 transition-all"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-text-muted">
                <span className="w-4 h-4 rounded border border-border-color bg-dark-navy flex items-center justify-center">
                  <RiCheckboxCircleLine className="text-teal text-xs" />
                </span>
                Remember me
              </label>
              <button type="button" className="text-xs text-teal hover:text-teal/80 transition-colors">
                Forgot password?
              </button>
            </div> */}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-deep-blue hover:bg-deep-blue/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-glow-blue"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <RiArrowRightLine className="text-lg" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-3 bg-dark-navy border border-border-color rounded-xl">
            <p className="text-xs text-text-muted text-center">
              Demo credentials: <span className="text-teal">admin@benefiqs.com</span> / <span className="text-teal">admin123</span>
            </p>
          </div>

          {/* <p className="text-center text-xs text-text-muted mt-6">
            © 2024 Benefiqs. All rights reserved.
          </p> */}
        </div>
      </section>
    </div>
  );
}
