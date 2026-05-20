"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="text-center mt-20 font-medium text-slate-500">
        🔄 Loading profile...
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const user = session.user;

  // 🌟 ডাটাবেজে ইমেজ লিংক না থাকলে বা খালি থাকলে ট্রু ফলব্যাক হ্যান্ডেলিং
  const hasImage = user.image && user.image.trim() !== "";
  // ইউজারের নামের প্রথম অক্ষর (যেমন: Antar Chandra Das -> A)
  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-4">
      <div className="text-center space-y-3">
        
        {/* 📸 ইমেজ সেকশন হ্যান্ডলার */}
        <div className="flex justify-center">
          {hasImage ? (
            <img
              src={user.image}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-[#1e6b65]"
              onError={(e) => {
                // যদি ডাটাবেজের ইমেজ লিংকটি ব্রোকেন বা নষ্ট হয়, তবে এটি লোড হবে
                e.target.style.display = 'none';
                const fallbackBox = document.getElementById('avatar-fallback');
                if (fallbackBox) fallbackBox.style.display = 'flex';
              }}
            />
          ) : null}

          {/* 🌟 ডিফল্ট টেক্সট অবতার (যদি ডাটাবেজে ছবি না থাকে বা লিংক কাজ না করে) */}
          <div
            id="avatar-fallback"
            style={{ display: hasImage ? 'none' : 'flex' }}
            className="w-20 h-20 rounded-full bg-[#eefcf7] text-[#1e6b65] border-2 border-[#1e6b65] items-center justify-center text-2xl font-bold uppercase"
          >
            {userInitial}
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-xl font-bold text-slate-800">
            {user.name || "Unknown User"}
          </h1>
          <p className="text-sm text-slate-500">
            {user.email}
          </p>
        </div>
      </div>

      <div className="border-t pt-4 text-center">
        <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
          Active Session Secure
        </span>
      </div>
    </div>
  );
}