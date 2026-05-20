
// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";

// const client = new MongoClient(process.env.MONGODB_URI);
// const db = client.db("mediqueue");

// export const auth = betterAuth({
//   database: mongodbAdapter(db, {
//     client
//   }),
//   emailAndPassword: { 
//     enabled: true, 
//   },
// });

import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import path from "node:path";
import dotenv from "dotenv";

// শুধুমাত্র লোকালহোস্টে কাজ করার সময় এটি .env.local লোড করবে
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
}

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const uri = process.env.MONGODB_URI || "mongodb+srv://MediQueue:90lhGAJ17RJ3NOqK@cluster0.4ofu8sq.mongodb.net/mediqueue?retryWrites=true&w=majority";

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
});