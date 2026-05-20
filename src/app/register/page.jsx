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

const SignUpPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  
  const validationChecks = {
    length: passwordValue.length >= 6,
    lowercase: /[a-z]/.test(passwordValue),
    uppercase: /[A-Z]/.test(passwordValue),
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    
    if (!validationChecks.length || !validationChecks.lowercase || !validationChecks.uppercase) {
      setServerError("Please satisfy all password criteria before registering.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signUp.email({
        email: user.email,
        password: user.password,
        name: user.name,
        image: user.image,
      });

      if (data) {

        router.push("/login");
      }

      if (error) {
        setServerError(error.message || "Registration failed. Try again.");
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
              <h2 className="text-3xl font-bold leading-tight">Start your learning journey</h2>
              <p className="text-emerald-100/80 text-sm leading-relaxed">
                Create a free account and book your first session in minutes.
              </p>
            </div>

           
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-sm text-emerald-100/90">
                <span className="p-1.5 rounded-lg bg-emerald-800/60 text-emerald-300">👥</span>
                <span>1,240+ expert tutors</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-emerald-100/90">
                <span className="p-1.5 rounded-lg bg-emerald-800/60 text-emerald-300">📖</span>
                <span>20+ subjects</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-emerald-100/90">
                <span className="p-1.5 rounded-lg bg-emerald-800/60 text-emerald-300">🕒</span>
                <span>Flexible schedules</span>
              </div>
            </div>
          </div>

        
          <div className="text-xs text-emerald-200/50 mt-12">
            © 2026 MediQueue
          </div>
        </div>

       
        <div className="w-full md:w-7/12 p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Create account</h1>
            <p className="text-sm text-slate-500 dark:text-emerald-400/80 mt-1">
              Fill in your details to get started
            </p>
          </div>

          <Form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
            
           
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField isRequired name="name" type="text" className="flex flex-col gap-1.5">
                <Label className="text-xs font-semibold text-slate-700 dark:text-emerald-300">Full name</Label>
                <Input 
                  placeholder="Rahim Sarkar" 
                  className="w-full px-3 py-2 border border-slate-200 dark:border-emerald-800 rounded-lg bg-transparent text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 text-sm transition-all"
                />
              </TextField>

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
                <Input 
                  placeholder="rahim@mail.com" 
                  className="w-full px-3 py-2 border border-slate-200 dark:border-emerald-800 rounded-lg bg-transparent text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 text-sm transition-all"
                />
              </TextField>
            </div>

            
            <TextField name="image" type="url" className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold text-slate-700 dark:text-emerald-300">Photo URL</Label>
              <Input 
                placeholder="https://i.ibb.co/your-photo.jpg" 
                className="w-full px-3 py-2 border border-slate-200 dark:border-emerald-800 rounded-lg bg-transparent text-slate-800 dark:text-white focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 text-sm transition-all"
              />
              <span className="text-[11px] text-slate-400 dark:text-emerald-500/70">
                Upload to imgbb or postimage and paste the link
              </span>
            </TextField>

        
            <TextField isRequired name="password" className="flex flex-col gap-1.5">
              <Label className="text-xs font-semibold text-slate-700 dark:text-emerald-300">Password</Label>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"}
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  placeholder="••••••" 
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

           
            <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg border border-emerald-100/70 dark:border-emerald-900/40 space-y-1.5">
              <div className={`flex items-center gap-2 text-xs font-medium transition-colors ${validationChecks.length ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500"}`}>
                <span>{validationChecks.length ? "✓" : "✕"}</span> At least 6 characters
              </div>
              <div className={`flex items-center gap-2 text-xs font-medium transition-colors ${validationChecks.lowercase ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500"}`}>
                <span>{validationChecks.lowercase ? "✓" : "✕"}</span> Contains a lowercase letter
              </div>
              <div className={`flex items-center gap-2 text-xs font-medium transition-colors ${validationChecks.uppercase ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500"}`}>
                <span>{validationChecks.uppercase ? "✓" : "✕"}</span> Contains an uppercase letter
              </div>
            </div>

          
            {serverError && (
              <div className="flex items-center gap-2 text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 px-3 py-2 rounded-lg border border-rose-200 dark:border-rose-900">
                <span>⚠️</span> {serverError}
              </div>
            )}

          
            <Button 
              className="w-full mt-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-sm text-sm focus:outline-none flex justify-center items-center" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </Form>

          
          <div className="relative flex py-4 items-center w-full">
            <div className="flex-grow border-t border-slate-100 dark:border-emerald-900"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-xs dark:text-emerald-500/60 uppercase tracking-wider">or</span>
            <div className="flex-grow border-t border-slate-100 dark:border-emerald-900"></div>
          </div>

     
          <Button
            onClick={handleGoogleSignin}
            className="w-full flex items-center justify-center gap-2 bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-emerald-900/30 text-slate-700 dark:text-emerald-200 border border-slate-200 dark:border-emerald-800 font-medium py-2 px-4 rounded-lg text-sm transition-all focus:outline-none shadow-sm"
          >
            <FcGoogle size={20} /> Sign up with Google
          </Button>

        
          <div className="text-center mt-5">
            <p className="text-sm text-slate-500 dark:text-emerald-400/60">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignUpPage;