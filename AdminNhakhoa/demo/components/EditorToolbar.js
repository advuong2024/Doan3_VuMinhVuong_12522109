import React, { useRef } from "react";
import { NewService } from '../service/NewService';

// Custom Undo và Redo icons
const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

// Hàm undo và redo
function undoChange() {
  if (this.quill) {
    this.quill.history.undo();
  }
}

function redoChange() {
  if (this.quill) {
    this.quill.history.redo();
  }
}

const imageHandler = (quillRef) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    if (!file) {
      console.error("Vui lòng chọn một file ảnh!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await NewService.uploadImage(formData); // Đợi kết quả
      console.log("Response từ NewService.uploadImage:", response);
      if (!response?.url) {
        throw new Error("Không nhận được URL ảnh từ server");
      }

      const quill = quillRef.current;
      if (!quill) {
        console.log("quillRef.current:", quillRef.current);
        throw new Error("Quill editor không được khởi tạo!");
      }

      // Lấy vùng chọn, nếu không có thì dùng vị trí cuối
      quill.focus();
      let range = quill.getSelection();
      if (!range) {
        const length = quill.getLength();
        range = { index: length - 1, length: 0 };
      }

      // Chèn ảnh
      quill.insertEmbed(range.index, "image", response.url);
      quill.setSelection(range.index + 1); // Di chuyển con trỏ sau ảnh
    } catch (error) {
      console.error("Lỗi khi chèn ảnh:", error);
    }
  };
};

// Xuất modules và formats
export const modules = (toolbarId, quillRef) => ({
  toolbar: {
    container: "#" + toolbarId,
    handlers: {
      undo: undoChange,
      redo: redoChange,
      image: imageHandler,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
});

export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "code-block",
];

// Quill Toolbar component
const QuillToolbar = ({ toolbarId }) => {
  return (
    <>
      {toolbarId && (
        <div id={toolbarId}>
          <span className="ql-formats">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-strike" />
          </span>
          <span className="ql-formats">
            <select className="ql-font">
              <option value="arial">Arial</option>
              <option value="comic-sans">Comic Sans</option>
              <option value="courier-new">Courier New</option>
              <option value="georgia">Georgia</option>
              <option value="helvetica">Helvetica</option>
              <option value="Inter" selected>
                Inter
              </option>
              <option value="lucida">Lucida</option>
            </select>
            <select className="ql-size">
              <option value="extra-small">Extra Small</option>
              <option value="small">Small</option>
              <option value="medium" selected>
                Medium
              </option>
              <option value="large">Large</option>
            </select>
            <select className="ql-header">
              <option value="1">Heading 1</option>
              <option value="2">Heading 2</option>
              <option value="3">Heading 3</option>
              <option value="4">Heading 4</option>
              <option value="5">Heading 5</option>
              <option value="6">Heading 6</option>
              <option value="">Normal</option>
            </select>
          </span>
          <span className="ql-formats">
            <button className="ql-list" value="ordered" />
            <button className="ql-list" value="bullet" />
            <button className="ql-indent" value="-1" />
            <button className="ql-indent" value="+1" />
          </span>
          <span className="ql-formats">
            <button className="ql-script" value="super" />
            <button className="ql-script" value="sub" />
            <button className="ql-blockquote" />
            <button EMBEDclassName="ql-direction" />
          </span>
          <span className="ql-formats">
            <select className="ql-align" />
            <select className="ql-color" />
            <select className="ql-background" />
          </span>
          <span className="ql-formats">
            <button className="ql-link" />
            <button className="ql-image" />
            <button className="ql-video" />
          </span>
          <span className="ql-formats">
            <button className="ql-formula" />
            <button className="ql-code-block" />
            <button className="ql-clean" />
          </span>
          <span className="ql-formats">
            <button className="ql-undo">
              <CustomUndo />
            </button>
            <button className="ql-redo">
              <CustomRedo />
            </button>
          </span>
        </div>
      )}
    </>
  );
};

export default QuillToolbar;