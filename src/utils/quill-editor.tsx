"use client";
import { useEffect, useRef, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

interface IProp {
  onChange: (value: string) => void;
  value?: string;
  // Optional Quill options if you want to customize further
}

export const QuillEditor = ({ onChange, value = "" }: IProp) => {
  const [text, setText] = useState("");
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote", "code"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],

        ["link", "image", "video"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ["clean"],
      ],
      clipboard: {
        matchVisual: false, // Prevent Quill from automatically converting characters
      },
    },

    formats: [
      "header",
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "code",
      "list",
      "indent",
      "link",
      "image",
      "video",
      "align",
      "color",
      "background",
    ],
    theme: "snow",
  });
  const directionSetRef = useRef(false);
  useEffect(() => {
    if (quill && !directionSetRef.current) {
      quill.on("text-change", () => {
        const content = quill.root.innerHTML;
        onChange(content);
      });

      // Set the initial value
      quill.root.innerHTML = value || "";
    }
  }, [quill]);
  useEffect(() => {
    if (quill) {
      // Only update the content if it's different
      if (quill.root.innerHTML !== value) {
        quill.root.innerHTML = value || "";
      }
    }
  }, [value, quill, onchange]);
  return <div ref={quillRef} />;
};
