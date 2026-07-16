// import React, { useState } from "react";
// import axios from "axios";
// import { RxCross2 } from "react-icons/rx";
// import { ADD_TASK_API } from "./Constant";

// const InputData = ({ close, addTask }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [loading, setLoading] = useState(false);

//   const userId = localStorage.getItem("_id");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !description) {
//       alert("Title & Description required!");
//       return;
//     }

//     setLoading(true);

//     const taskData = { title, description, status: true, userId };

//     try {
//       const response = await axios.post(ADD_TASK_API, taskData);
//       addTask(response.data.task);
//       close();
//     } catch (error) {
//       console.error("Error adding task:", error);
//       alert("Failed to add task. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div
//         style={{
//           position: "fixed",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           width: "100vw",
//           height: "100vh",
//           background: "rgba(0, 0, 0, 0.5)",
//         }}
//       >
//         <div
//           style={{
//             width: "320px",
//             padding: "20px",
//             borderRadius: "10px",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
//             backgroundColor: "#fff",
//             textAlign: "center",
//             position: "relative",
//           }}
//         >
//           <button
//             onClick={close}
//             style={{
//               position: "absolute",
//               top: "10px",
//               right: "10px",
//               fontSize: "15px",
//               color: "black",
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//             }}
//           >
//             <RxCross2 />
//           </button>

//           <input
//             type="text"
//             placeholder="Enter Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             style={{
//               width: "90%",
//               padding: "10px",
//               margin: "20px 0px",
//               borderRadius: "5px",
//               border: "4px solid #ccc",
//               fontSize: "16px",
//               outline: "none",
//             }}
//           />

//           <textarea
//             placeholder="Enter Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             style={{
//               width: "90%",
//               padding: "10px",
//               margin: "10px 0",
//               borderRadius: "5px",
//               border: "3px solid #ccc",
//               fontSize: "16px",
//               outline: "none",
//               resize: "none",
//               height: "80px",
//             }}
//           ></textarea>

//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             style={{
//               backgroundColor: "#009fe3",
//               color: "white",
//               padding: "10px 20px",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//               fontSize: "16px",
//             }}
//           >
//             {loading ? "Adding..." : "Submit"}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default InputData;
