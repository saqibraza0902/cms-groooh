// components/RichTextEditor.tsx
import React, { FC, useRef } from "react";
import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
} from "@syncfusion/ej2-react-richtexteditor";

import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-icons/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-splitbuttons/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-lists/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-richtexteditor/styles/material.css";
import { registerLicense } from "@syncfusion/ej2-base";
interface IProp {
  onChange: (text: any) => void;
  value: string;
}

const RichTextEditor = ({ onChange, value }: IProp) => {
  const editorRef = useRef<RichTextEditorComponent | null>(null);

  //   const handleChange = () => {
  //     const editorValue = editorRef.current?.getContent();
  //     // console.log(editorValue?.co);
  //     if (editorValue) {
  //       onChange(editorValue);
  //     }
  //   };

  const toolbarSettings: object = {
    items: [
      "Bold",
      "Italic",
      "Underline",
      "StrikeThrough",
      "FontName",
      "FontSize",
      "FontColor",
      "BackgroundColor",
      "LowerCase",
      "UpperCase",
      "|",
      "Formats",
      "Alignments",
      "OrderedList",
      "UnorderedList",
      "Outdent",
      "Indent",
      "|",
      "CreateLink",
      "Image",
      "|",
      "ClearFormat",
      "Print",
      "SourceCode",
      "FullScreen",
      "|",
      "Undo",
      "Redo",
    ],
  };

  const quickToolbarSettings: object = {
    image: [
      "Replace",
      "Align",
      "Caption",
      "Remove",
      "InsertLink",
      "OpenImageLink",
      "-",
      "EditImageLink",
      "RemoveImageLink",
      "Display",
      "AltText",
      "Dimension",
    ],
  };
  registerLicense(process.env.NEXT_PUBLIC_EDITOR_KEY as string);
  return (
    <RichTextEditorComponent
      ref={editorRef}
      value={value}
      height={450}
      toolbarSettings={toolbarSettings}
      quickToolbarSettings={quickToolbarSettings}
      change={onChange}
    >
      <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
    </RichTextEditorComponent>
  );
};

export default RichTextEditor;
