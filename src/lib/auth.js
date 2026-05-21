
import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import path from "node:path";
import dotenv from "dotenv";

// শুধুমাত্র লোকালহোস্টে কাজ করার সময় এটি .env.local লোড করবে
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
}

import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins"
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const uri = process.env.MONGODB_URI || "";

// 🌟 বিল্ড টাইম ক্র্যাশ এড়ানোর কন্ডিশন (প্রোডাকশন ডেপ্লয়মেন্ট সেফটি)
if (!uri && process.env.NODE_ENV === "production") {
  console.warn("MONGODB_URI is not set in production yet. Skipping initialization for build.");
}

// মঙ্গোডিবি ক্লায়েন্ট (বিল্ডের সময় uri না থাকলে ক্র্যাশ করবে না)
const client = uri ? new MongoClient(uri) : null;
const db = client ? client.db("mediqueue") : null;

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: client,
    ensureIndices: process.env.NODE_ENV !== "production" // শুধুমাত্র লোকালে ট্রু থাকবে
  }),
  
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

  emailAndPassword: { 
    enabled: true, 
  },
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, 
    },
  session:{
    cookieCache:{
      enabled: true,
      strategy: "jwt",
      maxAge: 7*24*60*60,
    }
  },
  plugins: [
        jwt()
    ]
});