"use client";
import React, { useEffect, useState } from "react";
import { hasCookie, setCookie } from "cookies-next";
import { ButtonLayout } from "@/ui/components/animated-button";
import Modal from "@/ui/components/modal-component";
const CookiesConcent = () => {
  const [showConcent, setShowConcent] = useState(false);
  const [showmodal, setShowmodal] = useState(false);
  useEffect(() => {
    setShowConcent(hasCookie("localConcent"));
    if (!hasCookie("localConcent")) {
      setShowmodal(true);
    }
  }, []);

  return (
    <Modal isOpen={showmodal}>
      <div className="flex items-center justify-center lg:h-5.5k 2xl:h-9k">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto">
          <p className="text-white text-center lg:text-start text-sm lg:text-base mb-6">
            We use cookies to improve your experience. By continuing, you
            consent to our use of cookies.
          </p>
          <div className="flex justify-center gap-5">
            <div
              className={`flex justify-center space-x-4 `}
              onClick={() => {
                setCookie("localConcent", "false"), setShowmodal(false);
                window.location.reload();
              }}
            >
              <ButtonLayout className="bg-brand_red-800 min-w-32 text-white rounded-lg hover:bg-primary-dark transition duration-300">
                Reject
              </ButtonLayout>
            </div>
            <div
              className={`flex justify-center space-x-4 `}
              onClick={() => {
                setShowmodal(false), setCookie("localConcent", "true");
                window.location.reload();
              }}
            >
              <ButtonLayout className="bg-primary text-black min-w-32 rounded-lg hover:bg-primary-dark transition duration-300">
                Accept
              </ButtonLayout>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CookiesConcent;
