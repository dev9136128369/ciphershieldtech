// import React, { useState, useRef } from "react";
// import ReactQuill from "react-quill";
// import axios from "axios";
// import "react-quill/dist/quill.snow.css";

// export default function ArticleForm({ token }) {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [status, setStatus] = useState("published");
//   const [mediaPreview, setMediaPreview] = useState(null);
//   const quillRef = useRef();

//   // Image/Video Upload Handler
//   const handleMediaUpload = async () => {
//     const input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*,video/*,application/pdf");
//     input.click();

//     input.onchange = async () => {
//       const file = input.files[0];
//       setMediaPreview(URL.createObjectURL(file));

//       const formData = new FormData();
//       formData.append("media", file);

//       try {
//         const res = await axios.post("http://localhost:8000/api/upload", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: token,
//           },
//         });
//         const url = res.data.url;
//         const editor = quillRef.current.getEditor();
//         const range = editor.getSelection();

//         if (file.type === "application/pdf") {
//           editor.insertText(range.index, file.name, "link", url);
//         } else {
//           editor.insertEmbed(range.index, file.type.startsWith("video") ? "video" : "image", url);
//         }
//       } catch (err) {
//         console.error("Upload failed:", err);
//       }
//     };
//   };

//   const modules = {
//     toolbar: {
//       container: [
//         [{ header: [1, 2, 3, false] }],
//         ["bold", "italic", "underline", "strike"],
//         [{ color: [] }, { background: [] }],
//         [{ list: "ordered" }, { list: "bullet" }],
//         ["link", "image", "video"],
//         ["clean"],
//       ],
//       handlers: {
//         image: handleMediaUpload,
//         video: handleMediaUpload,
//       },
//     },
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!title || !content) {
//       alert("Title and content are required");
//       return;
//     }

//     try {
//       await axios.post(
//         "http://localhost:8000/api/articles",
//         { title, content, status },
//         {
//           headers: { Authorization: token },
//         }
//       );
//       alert("Article submitted!");
//       setTitle("");
//       setContent("");
//       setStatus("published");
//       setMediaPreview(null);
//     } catch (error) {
//       console.error("Error submitting article", error);
//     }
//   };

//   return (
//     <div className="container" style={{ padding: "20px" }}>
//       <h2>Create Article</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Article Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//           style={{
//             width: "100%",
//             padding: "10px",
//             marginBottom: "10px",
//             fontSize: "20px",
//             fontWeight: "bold",
//           }}
//         />

//         {mediaPreview && (
//           <div style={{ marginBottom: "10px" }}>
//             <p>Preview:</p>
//             {mediaPreview.includes(".pdf") ? (
//               <a href={mediaPreview} target="_blank" rel="noopener noreferrer">
//                 View Uploaded PDF
//               </a>
//             ) : mediaPreview.includes("video") ? (
//               <video src={mediaPreview} controls width="100%" />
//             ) : (
//               <img src={mediaPreview} alt="preview" style={{ maxWidth: "100%" }} />
//             )}
//           </div>
//         )}

//         <ReactQuill
//           ref={quillRef}
//           theme="snow"
//           value={content}
//           onChange={setContent}
//           style={{ marginBottom: "10px", minHeight: "200px" }}
//           modules={modules}
//         />

//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           style={{ padding: "10px", marginBottom: "10px" }}
//         >
//           <option value="published">Published</option>
//           <option value="draft">Draft</option>
//         </select>

//         <button type="submit" style={{ padding: "10px 20px" }}>
//           Publish
//         </button>
//       </form>
//     </div>
//   );
// }