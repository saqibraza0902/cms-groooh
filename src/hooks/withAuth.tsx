"use client";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const WithAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const AuthComponent: React.FC<P> = (props) => {
    const [authState, setAuthState] = useState(auth.currentUser);
    const router = useRouter();
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setAuthState(user);
        if (!user) {
          router.push("/signin");
        }
      });

      return () => unsubscribe();
    }, [authState, router]);
    if (!authState) {
      return null;
    }
    return <WrappedComponent {...props} />;
  };
  return AuthComponent;
};

export default WithAuth;
