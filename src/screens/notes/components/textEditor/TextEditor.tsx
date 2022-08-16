import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import styles from "./TextEditor.module.css";

const TextEditor = ({ initialValue, noteData }: any) => {
  console.log("teste");
  console.log({noteData});
  const [value, setValue] = useState<any>({});
 useEffect(() => {
   if(noteData){
    setValue(noteData)
   }
 }, [noteData])
 
  return (
    <div className={styles.text_container}>
      <Editor
        apiKey="gs05di5c7tnxror00ff8kzcpuf1nvc9pjiffq6yx4kx1ouao"
        initialValue={"<p>Por favor insira seu texto aqui...</p>"}
        value={value.content}
        onEditorChange={(newValue, editor) => setValue(newValue)}
        init={{
          resize: false,
          height: "65vh",
          statusbar: false,
          menubar: false,
          plugins: "lists link",
          toolbar:
            "fontfamily | blocks | " +
            "bold italic underline strikethrough " +
            "forecolor backcolor align " +
            "bullist numlist outdent indent link | ",
          content_style: "body { background-color: #F9F9F9; }",
        }}
      />
    </div>
  );
};

export default TextEditor;
