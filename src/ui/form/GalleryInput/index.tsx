"use client";
import React, { useState } from "react";
import Gallery from "@/layout/EditServices/Gallery";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  images: string[];
  onSelectImage: (url: string) => void;
  onOpenGallery: () => void;
  onCloseGallery: () => void;
  isGalleryOpen: boolean;
}

const GalleryInput = ({
  images,
  onSelectImage,
  onOpenGallery,
  onCloseGallery,
  isGalleryOpen,
  ...rest
}: IInput) => {
  const handleImageSelect = (url: string) => {
    onSelectImage(url);
    onCloseGallery();
  };
  return (
    <div className="w-full flex justify-between border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
      <input
        className="w-full px-4 py-2 border-none outline-none"
        placeholder="Please input the title of the page"
        {...rest}
      />

      <button
        className="w-36 text-white px-2 bg-brand_blue-200"
        onClick={onOpenGallery}
      >
        Upload Image
      </button>

      {isGalleryOpen && (
        <Gallery
          onClose={onCloseGallery}
          open={isGalleryOpen}
          images={images}
          onSelectImage={handleImageSelect}
        />
      )}
    </div>
  );
};

export default GalleryInput;
