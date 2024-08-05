"use client";
import { auth, db } from "@/utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const adminAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const AuthComponent: React.FC<P> = (props) => {
    const [authState, setAuthState] = useState(auth.currentUser);
    const [admin, setAdmin] = useState(null);
    const router = useRouter();
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        setAuthState(user);
        if (user) {
          const usersRef = collection(db, "Authers");
          console.log(user);
          const q = query(usersRef, where("email", "==", user.email));
          const snap = await getDocs(q);
          const data = snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(data);
          // @ts-ignore
          setAdmin(data.length > 0 && data[0].isAdmin);
          console.log("Admin", admin);
          if (!admin && admin !== null) {
            router.push("/signin");
          }
        } else {
          router.push("/signin");
        }
      });

      return () => unsubscribe();
    }, [authState, router, admin]);
    if (!authState) {
      return null;
    }
    if (admin) {
      // Render the wrapped component if the user is an admin
      return <WrappedComponent {...props} />;
    } else {
      // Return null or redirect to login if the user is not an admin
      return null;
    }
  };
  return AuthComponent;
};

export default adminAuth;
