"use client";
import React, { useState } from "react";
import { auth, db } from "@/utils/firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const SignInLayout = () => {
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auths = await signInWithPopup(auth, provider);
      const authorsDocRef = doc(db, "Authers", auths.user.uid);
      await setDoc(authorsDocRef, {
        email: auths.user.email,
        name: auths.user.displayName,
        avatar: auths.user.photoURL,
        description: auths.user.providerData[0].providerId,
        isAdmin: false,
        isAuther: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        email,
        passwordOne
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="bg-gray-200 min-h-screen flex items-center justify-center"
    >
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={passwordOne}
            onChange={(e) => setPasswordOne(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Sign In
        </button>
        <button
          onClick={handleSignIn}
          className="w-full bg-yellow-400 text-gray-800 py-2 rounded mt-4 hover:bg-yellow-500 focus:outline-none focus:bg-yellow-500"
        >
          Sign In With Google
        </button>
        <a
          href="#"
          className="block text-blue-600 text-sm mt-4 hover:underline"
        >
          Forgot your password?
        </a>
      </div>
    </form>
  );
};

export default SignInLayout;
