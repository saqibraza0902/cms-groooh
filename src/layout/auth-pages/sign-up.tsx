"use client";
import { useState } from "react";
import { auth, db } from "@/utils/firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
const initialState = {
  email: "",
  passwordOne: "",
};
const SignUpLayout = () => {
  const [detail, setDetails] = useState(initialState);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const auths = await createUserWithEmailAndPassword(
        auth,
        detail.email,
        detail.passwordOne
      );
      console.log(auths);
      const authorsDocRef = doc(db, "Authers", auths.user.uid);
      await setDoc(authorsDocRef, {
        email: auths.user.email,
        name: auths.user.displayName,
        avatar: auths.user.photoURL,
        description: auths.user.providerData[0].providerId,
        isAdmin: false,
        isAuther: false,
      });
      setDetails(initialState);
    } catch (error) {
      alert(error);
    }
  };
  // Function to check if an email already exists in Firebase authentication
  const checkIfEmailExists = async (email: string) => {
    try {
      // const newauth = getAuth();
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods && methods.length > 0) {
        // Return the provider ID for the existing account
        return { email, providerId: methods[0] };
      }
      return null;
    } catch (error) {
      console.error("Error checking if email exists:", error);
      return null;
    }
  };

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
  const abc = () => {
    // addDoc(collection(db, "Authers"), {
    //   email: auths?.user.email,
    //   name: auths?.user.displayName,
    //   avatar: auths?.user.photoURL,
    //   description: auths?.user.providerData[0].providerId,
    //   isAdmin: false,
    //   isAuther: false,
    // });
    // setDetails(initialState);
  };

  return (
    <div className=" h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={detail.email}
              onChange={(e) => setDetails({ ...detail, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={detail.passwordOne}
              onChange={(e) =>
                setDetails({ ...detail, passwordOne: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none"
          >
            Sign Up
          </button>
        </form>
        <button
          onClick={handleSignIn}
          className="w-full mt-4 bg-yellow-400 text-gray-900 py-2 rounded-md transition duration-300 hover:bg-yellow-500 focus:outline-none"
        >
          Sign Up With Google
        </button>
        <a
          href="#"
          className="block mt-4 text-blue-600 text-sm hover:underline"
        >
          Forgot your password?
        </a>
      </div>
    </div>
  );
};

export default SignUpLayout;
