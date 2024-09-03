"use client";
import { useEffect, useRef } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import Quill from "quill";
interface IProp {
  onChange: (value: string) => void;
  value?: string;
}

export const QuillEditor = ({ onChange, value = "" }: IProp) => {
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
        // Customize how content is pasted to retain special characters
        matchers: [
          [
            "span",
            (
              node: { textContent: any },
              delta: { insert: (arg0: any) => any }
            ) => {
              // This matcher ensures that special characters are not converted
              const hasSpecialChar = /[^\x00-\x7F]/.test(
                node.textContent || ""
              );
              if (hasSpecialChar) {
                return delta.insert(node.textContent || "");
              }
              return delta;
            },
          ],
        ],
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
  }, [value, quill, onChange]);

  return <div ref={quillRef} />;
};
