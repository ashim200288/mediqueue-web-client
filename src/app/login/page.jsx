"use client";

import React, { useState } from "react";
import { Card, Separator } from "@heroui/react";
import {
  Button,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      if (data) {
        router.push('/');
      }

      if (error) {
        setServerError(error.message || "Incorrect password. Please try again.");
      }
    } catch (err) {
      setServerError("Something went wrong. Please check your network.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 dark:bg-emerald-950/20 px-4 py-8 transition-colors duration-300">
      
      
      <div className="flex w-full max-w-4xl bg-white dark:bg-[#022c22] rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-emerald-900 transition-colors duration-300">
        
       
        <div className="hidden md:flex md:w-5/12 bg-[#044e3a] p-10 flex-col justify-between text-white relative">
          <div className="space-y-8">
          
            <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white text-lg">🩺</span>
              <span>MediQueue</span>
            </div>

           
            <div className="space-y-3">
              <h2 className="text-3xl font-bold leading-tight">Welcome back, learner</h2>
              <p className="text-emerald-100/80 text-sm leading-relaxed">
                Log in to access your booked sessions and manage your tutors.
              </p>
            </div>

            
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-sm text-emerald-100/90">
                <span className="p-1.5 rounded-lg bg-emerald-800/60 text-emerald-300">📅</span>
                <span>View your sessions</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-emerald-100/90">
                <span className="p-1.5 rounded-lg bg-emerald-800/60 text-emerald-300">🛡️</span>
                <span>Secure JWT auth</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-emerald-100/90">
                <span className="p-1.5 rounded-lg bg-emerald-800/60 text-emerald-300">💻</span>
                <span>Learn from anywhere</span>
              </div>
            </div>
          </div>

         
          <div className="text-xs text-emerald-200/50 mt-12">
            © 2026 MediQueue
          </div>
        </div>

        
        <div className="w-full md:w-7/12 p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Log in</h1>
            <p className="text-sm text-slate-500 dark:text-emerald-400/80 mt-2">
              Enter your credentials to continue
            </p>
          </div>

        
          <Form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">
            
            
            <TextField
              isRequired
              name="email"
              type="email"
              className="flex flex-col gap-1.5"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label className="text-xs font-semibold text-slate-700 dark:text-emerald-300">Email address</Label>
              <div className="relative">
                <Input 
                  placeholder="name@mail.com" 
                  className="w-full px-3 py-2 border border-slate-200 dark:border-emerald-800 rounded-lg bg-transparent text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 text-sm transition-all"
                />
              </div>
            </TextField>

           
            <TextField
              isRequired
              name="password"
              type={showPassword ? "text" : "password"}
              className="flex flex-col gap-1.5"
            >
              <div className="flex justify-between items-center">
                <Label className="text-xs font-semibold text-slate-700 dark:text-emerald-300">Password</Label>
                <Link href="/forgot-password" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input 
                  placeholder="••••••••" 
                  className="w-full pl-3 pr-10 py-2 border border-slate-200 dark:border-emerald-800 rounded-lg bg-transparent text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-emerald-500 hover:text-slate-600 dark:hover:text-emerald-300 focus:outline-none"
                >
                  {showPassword ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
                </button>
              </div>
            </TextField>

            
            {serverError && (
              <div className="flex items-center gap-2 text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 px-3 py-2 rounded-lg border border-rose-200 dark:border-rose-900">
                <span>⚠️</span> {serverError}
              </div>
            )}

           
            <Button 
              className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-sm text-sm focus:outline-none flex justify-center items-center" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </Button>
          </Form> 
          
          <div className="relative flex py-4 items-center w-full">
            <div className="flex-grow border-t border-slate-100 dark:border-emerald-900"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-xs dark:text-emerald-500/60 uppercase tracking-wider">or continue with</span>
            <div className="flex-grow border-t border-slate-100 dark:border-emerald-900"></div>
          </div>

         
          <Button
            onClick={handleGoogleSignin}
            className="w-full flex items-center justify-center gap-2 bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-emerald-900/30 text-slate-700 dark:text-emerald-200 border border-slate-200 dark:border-emerald-800 font-medium py-2 px-4 rounded-lg text-sm transition-all focus:outline-none shadow-sm"
          >
            <FcGoogle size={20} /> Sign in with Google
          </Button>

          
          <div className="text-center mt-6">
            <p className="text-sm text-slate-500 dark:text-emerald-400/60">
              Don't have an account?{" "}
              <Link href="/register" className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;