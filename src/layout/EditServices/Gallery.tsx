"use client";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";

interface IProp {
  open: boolean;
  onClose: () => void;
  images: string[];
  onSelectImage: (url: string) => void;
}

export default function Gallery({
  open,
  onClose,
  images,
  onSelectImage,
}: IProp) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSelect = (url: string) => {
    setSelectedImage(url);
  };

  const handleConfirmSelect = () => {
    if (selectedImage) {
      onSelectImage(selectedImage);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-6xl  data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-brand_green-600 px-4 pb-4 pt-5 sm:p-6 sm:pb-4 max-h-[500px] overflow-y-auto">
              <div className="grid grid-cols-10 gap-4">
                {images.map((url, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelect(url)}
                    className={`w-24 h-24 flex items-center justify-center border rounded-xl ${
                      selectedImage === url
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    <Image src={url} height={100} width={100} alt="" />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleConfirmSelect}
              >
                Select
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
