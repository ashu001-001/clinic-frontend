// import React, { useEffect, useRef, useState } from "react";
// import Header from "./Header";

// const upperTeeth = [
//     18, 17, 16, 15, 14, 13, 12, 11,
//     21, 22, 23, 24, 25, 26, 27, 28
// ];

// const lowerTeeth = [
//     48, 47, 46, 45, 44, 43, 42, 41,
//     31, 32, 33, 34, 35, 36, 37, 38
// ];

// function Tooth({
//     number,
//     selected,
//     condition,
//     onClick,
//     upper = true,
// }) {
//     const conditionColors = {
//         Healthy: "#ffffff",
//         Caries: "#ffd6d6",
//         RCT: "#d8ecff",
//         Crown: "#fff0b8",
//         Extraction: "#eadcff",
//         Missing: "#e9e9e9",
//     };

//     const conditionBorders = {
//         Healthy: "#aebdca",
//         Caries: "#dc3545",
//         RCT: "#007bff",
//         Crown: "#d39e00",
//         Extraction: "#7b3fc6",
//         Missing: "#777",
//     };

//     return (
//         <div
//             onClick={() => onClick(number)}
//             style={{
//                 width: "58px",
//                 textAlign: "center",
//                 cursor: "pointer",
//                 userSelect: "none",
//             }}
//         >
//             <div
//                 style={{
//                     fontSize: "12px",
//                     fontWeight: selected ? "700" : "500",
//                     color: selected
//                         ? "#0056b3"
//                         : "#555",
//                     marginBottom: "7px",
//                 }}
//             >
//                 {number}
//             </div>

//             <div
//                 style={{
//                     position: "relative",
//                     width: "48px",
//                     height: "58px",
//                     margin: "0 auto",
//                 }}
//             >
//                 <div
//                     style={{
//                         position: "absolute",
//                         inset: "0",
//                         background:
//                             conditionColors[condition] ||
//                             "#fff",

//                         border: selected
//                             ? "3px solid #0056b3"
//                             : `2px solid ${conditionBorders[
//                             condition
//                             ] || "#aebdca"
//                             }`,

//                         borderRadius: upper
//                             ? "48% 48% 42% 42% / 42% 42% 58% 58%"
//                             : "42% 42% 48% 48% / 58% 58% 42% 42%",

//                         boxShadow: selected
//                             ? "0 0 14px rgba(0,86,179,.35)"
//                             : "0 2px 5px rgba(0,0,0,.08)",

//                         transition:
//                             "all .15s ease",
//                     }}
//                 />

//                 <div
//                     style={{
//                         position: "absolute",
//                         width: "18px",
//                         height: "18px",
//                         left: "50%",
//                         top: "50%",
//                         transform:
//                             "translate(-50%, -50%)",
//                         border:
//                             "1px solid rgba(120,140,155,.45)",
//                         borderRadius: "50%",
//                         background:
//                             condition === "Caries"
//                                 ? "#ff8c8c"
//                                 : condition === "RCT"
//                                     ? "#80c7ff"
//                                     : condition === "Crown"
//                                         ? "#ffd85c"
//                                         : "#f8fbfd",
//                     }}
//                 />

//                 <div
//                     style={{
//                         position: "absolute",
//                         width: "1px",
//                         height: "30px",
//                         left: "50%",
//                         top: "14px",
//                         transform:
//                             "translateX(-50%)",
//                         background:
//                             "rgba(120,140,155,.35)",
//                     }}
//                 />
//             </div>
//         </div>
//     );
// }

// function DentalCanvas() {
//     const canvasRef = useRef(null);

//     const [activeMode, setActiveMode] = useState("draw");
//     const [isDrawing, setIsDrawing] = useState(false);
//     const [brushColor, setBrushColor] = useState("#0056b3");
//     const [brushSize, setBrushSize] = useState(4);
//     const [selectedTooth, setSelectedTooth] = useState(null);

//     const [toothConditions, setToothConditions] = useState({});

//     const setToothCondition = (condition) => {
//         if (!selectedTooth) return;

//         setToothConditions((prev) => ({
//             ...prev,
//             [selectedTooth]: condition,
//         }));
//     };

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;

//         const ctx = canvas.getContext("2d");

//         ctx.lineCap = "round";
//         ctx.lineJoin = "round";
//         ctx.strokeStyle = brushColor;
//         ctx.lineWidth = brushSize;
//     }, [brushColor, brushSize]);

//     const getPosition = (e) => {
//         const canvas = canvasRef.current;
//         const rect = canvas.getBoundingClientRect();

//         const scaleX = canvas.width / rect.width;
//         const scaleY = canvas.height / rect.height;

//         return {
//             x: (e.clientX - rect.left) * scaleX,
//             y: (e.clientY - rect.top) * scaleY,
//         };
//     };

//    const startDrawing = (e) => {
//     if (activeMode !== "draw") return;

//     e.preventDefault();

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     const { x, y } = getPosition(e);

//     ctx.beginPath();
//     ctx.moveTo(x, y);

//     setIsDrawing(true);
// };

// const draw = (e) => {
//     if (!isDrawing || activeMode !== "draw") return;

//     e.preventDefault();

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     const { x, y } = getPosition(e);

//     ctx.lineTo(x, y);
//     ctx.stroke();
// };

// const stopDrawing = (e) => {
//     if (!isDrawing) return;

//     if (e) {
//         e.preventDefault();
//     }

//     setIsDrawing(false);

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     ctx.closePath();
// };

//     const clearCanvas = () => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");

//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//     };

//     const selectTooth = (number) => {
//         setSelectedTooth(number);
//     };

//     return (
//         <>
//             <Header />

//             <div
//                 style={{
//                     padding: "25px",
//                     background: "#f5f9ff",
//                     minHeight: "100vh",
//                 }}
//             >
//                 {/* Header */}
//                 <div
//                     style={{
//                         background: "#fff",
//                         padding: "20px 25px",
//                         borderRadius: "15px",
//                         marginBottom: "20px",
//                         boxShadow: "0 4px 15px rgba(0,0,0,.08)",
//                     }}
//                 >
//                     <h2
//                         style={{
//                             margin: 0,
//                             color: "#0056b3",
//                         }}
//                     >
//                         🦷 Dental Canvas Playground
//                     </h2>

//                     <p
//                         style={{
//                             margin: "6px 0 0",
//                             color: "#777",
//                         }}
//                     >
//                         Drawing aur Dental Tooth Chart dono ek hi jagah
//                     </p>
//                 </div>

//                 {/* Mode Buttons */}
//                 <div
//                     style={{
//                         background: "#fff",
//                         padding: "15px",
//                         borderRadius: "12px",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "10px",
//                         marginBottom: "20px",
//                         boxShadow: "0 4px 15px rgba(0,0,0,.08)",
//                     }}
//                 >
//                     <button
//                         onClick={() => setActiveMode("draw")}
//                         style={{
//                             background:
//                                 activeMode === "draw"
//                                     ? "#0056b3"
//                                     : "#eef5ff",
//                             color:
//                                 activeMode === "draw"
//                                     ? "#fff"
//                                     : "#0056b3",
//                             border: "none",
//                             padding: "10px 18px",
//                             borderRadius: "8px",
//                             cursor: "pointer",
//                             fontWeight: "600",
//                         }}
//                     >
//                         ✏️ Draw
//                     </button>

//                     <button
//                         onClick={() => {
//                             setActiveMode("teeth");
//                             setIsDrawing(false);
//                         }}
//                         style={{
//                             background:
//                                 activeMode === "teeth"
//                                     ? "#0056b3"
//                                     : "#eef5ff",
//                             color:
//                                 activeMode === "teeth"
//                                     ? "#fff"
//                                     : "#0056b3",
//                             border: "none",
//                             padding: "10px 18px",
//                             borderRadius: "8px",
//                             cursor: "pointer",
//                             fontWeight: "600",
//                         }}
//                     >
//                         🦷 Tooth Chart
//                     </button>
//                 </div>

//                 {/* DRAW MODE */}
//                 {activeMode === "draw" && (
//                     <>
//                         <div
//                             style={{
//                                 background: "#fff",
//                                 padding: "15px",
//                                 borderRadius: "12px",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "20px",
//                                 marginBottom: "20px",
//                                 boxShadow: "0 4px 15px rgba(0,0,0,.08)",
//                             }}
//                         >
//                             <label>
//                                 Color:

//                                 <input
//                                     type="color"
//                                     value={brushColor}
//                                     onChange={(e) =>
//                                         setBrushColor(e.target.value)
//                                     }
//                                     style={{
//                                         marginLeft: "8px",
//                                     }}
//                                 />
//                             </label>

//                             <label>
//                                 Brush Size:

//                                 <input
//                                     type="range"
//                                     min="1"
//                                     max="30"
//                                     value={brushSize}
//                                     onChange={(e) =>
//                                         setBrushSize(
//                                             Number(e.target.value)
//                                         )
//                                     }
//                                     style={{
//                                         marginLeft: "8px",
//                                     }}
//                                 />
//                             </label>

//                             <button
//                                 onClick={clearCanvas}
//                                 style={{
//                                     background: "#dc3545",
//                                     color: "#fff",
//                                     border: "none",
//                                     padding: "9px 18px",
//                                     borderRadius: "7px",
//                                     cursor: "pointer",
//                                 }}
//                             >
//                                 🗑️ Clear
//                             </button>
//                         </div>

//                         <div
//                             style={{
//                                 background: "#fff",
//                                 padding: "15px",
//                                 borderRadius: "12px",
//                                 boxShadow:
//                                     "0 4px 15px rgba(0,0,0,0.08)",
//                             }}
//                         >
//                            <canvas
//     ref={canvasRef}
//     width={1000}
//     height={600}

//     onPointerDown={startDrawing}
//     onPointerMove={draw}
//     onPointerUp={stopDrawing}
//     onPointerCancel={stopDrawing}
//     onPointerLeave={stopDrawing}

//     style={{
//         display: "block",
//         width: "100%",
//         height: "auto",
//         border: "2px solid #dbe7f5",
//         borderRadius: "8px",

//         cursor: "crosshair",

//         background: "#fff",

//         // ⭐ Mobile drawing ke liye important
//         touchAction: "none",

//         // drawing ko smooth rakhne ke liye
//         userSelect: "none",
//         WebkitUserSelect: "none",
//     }}
// />
//                         </div>
//                     </>
//                 )}

//                 {/* TOOTH CHART MODE */}
//                 {activeMode === "teeth" && (
//                     <div
//                         style={{
//                             display: "grid",
//                             gridTemplateColumns: "1fr 280px",
//                             gap: "20px",
//                             alignItems: "start",
//                         }}
//                     >
//                         {/* Tooth Chart */}
//                         <div
//                             style={{
//                                 background: "#fff",
//                                 borderRadius: "15px",
//                                 padding: "35px 20px",
//                                 boxShadow:
//                                     "0 4px 15px rgba(0,0,0,.08)",
//                                 overflowX: "auto",
//                             }}
//                         >
//                             <h3
//                                 style={{
//                                     textAlign: "center",
//                                     color: "#0056b3",
//                                     marginTop: 0,
//                                 }}
//                             >
//                                 UPPER ARCH
//                             </h3>

//                             <div
//                                 style={{
//                                     display: "flex",
//                                     justifyContent: "center",
//                                     minWidth: "900px",
//                                 }}
//                             >
//                               {upperTeeth.map((number) => (
//     <Tooth
//         key={number}
//         number={number}
//         selected={selectedTooth === number}
//         condition={toothConditions[number]}
//         onClick={selectTooth}
//         upper={true}
//     />
// ))}
//                             </div>

//                             <div
//                                 style={{
//                                     height: "1px",
//                                     background: "#dce7f2",
//                                     margin: "35px 0",
//                                 }}
//                             />

//                             <h3
//                                 style={{
//                                     textAlign: "center",
//                                     color: "#0056b3",
//                                 }}
//                             >
//                                 LOWER ARCH
//                             </h3>

//                             <div
//                                 style={{
//                                     display: "flex",
//                                     justifyContent: "center",
//                                     minWidth: "900px",
//                                 }}
//                             >
//                                 {lowerTeeth.map((number) => (
//                                     <Tooth
//                                         key={number}
//                                         number={number}
//                                         selected={selectedTooth === number}
//                                         condition={toothConditions[number]}
//                                         onClick={selectTooth}
//                                         upper={false}
//                                     />
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Information Panel */}
//                         <div
//                             style={{
//                                 background: "#fff",
//                                 borderRadius: "15px",
//                                 padding: "22px",
//                                 boxShadow:
//                                     "0 4px 15px rgba(0,0,0,.08)",
//                             }}
//                         >
//                             <h3
//                                 style={{
//                                     marginTop: 0,
//                                     color: "#0056b3",
//                                 }}
//                             >
//                                 Tooth Information
//                             </h3>

//                             {!selectedTooth ? (
//                                 <div
//                                     style={{
//                                         color: "#888",
//                                         lineHeight: "1.6",
//                                     }}
//                                 >
//                                     🦷

//                                     <br />

//                                     Select a tooth from the chart.
//                                 </div>
//                             ) : (
//                                 <>
//                                     <div
//                                         style={{
//                                             background: "#eaf6ff",
//                                             borderRadius: "10px",
//                                             padding: "15px",
//                                             marginBottom: "15px",
//                                         }}
//                                     >
//                                         <div
//                                             style={{
//                                                 fontSize: "13px",
//                                                 color: "#777",
//                                             }}
//                                         >
//                                             Selected Tooth
//                                         </div>

//                                         <div
//                                             style={{
//                                                 fontSize: "32px",
//                                                 fontWeight: "700",
//                                                 color: "#0056b3",
//                                             }}
//                                         >
//                                             {selectedTooth}
//                                         </div>
//                                     </div>

//                                     <div
//                                         style={{
//                                             padding: "12px",
//                                             border:
//                                                 "1px solid #e5e5e5",
//                                             borderRadius: "9px",
//                                             marginBottom: "10px",
//                                         }}
//                                     >
//                                         <strong>
//                                             Tooth Number:
//                                         </strong>{" "}
//                                         {selectedTooth}
//                                     </div>

//                                     <div
//                                         style={{
//                                             padding: "12px",
//                                             border:
//                                                 "1px solid #e5e5e5",
//                                             borderRadius: "9px",
//                                         }}
//                                     >
//                                         <strong>Status:</strong>{" "}
//                                         Healthy
//                                     </div>
//                                     <div
//     style={{
//         marginTop: "15px",
//     }}
// >
//     <div
//         style={{
//             fontWeight: "600",
//             marginBottom: "10px",
//             color: "#333",
//         }}
//     >
//         Condition
//     </div>

//     <div
//         style={{
//             display: "grid",
//             gridTemplateColumns: "1fr 1fr",
//             gap: "8px",
//         }}
//     >
//         {[
//             "Healthy",
//             "Caries",
//             "RCT",
//             "Crown",
//             "Extraction",
//             "Missing",
//         ].map((condition) => (
//             <button
//                 key={condition}
//                 onClick={() =>
//                     setToothCondition(condition)
//                 }
//                 style={{
//                     padding: "9px 5px",
//                     borderRadius: "7px",
//                     border:
//                         toothConditions[
//                             selectedTooth
//                         ] === condition
//                             ? "2px solid #0056b3"
//                             : "1px solid #ddd",

//                     background:
//                         toothConditions[
//                             selectedTooth
//                         ] === condition
//                             ? "#eaf6ff"
//                             : "#fff",

//                     color: "#333",
//                     cursor: "pointer",
//                     fontWeight:
//                         toothConditions[
//                             selectedTooth
//                         ] === condition
//                             ? "600"
//                             : "400",
//                 }}
//             >
//                 {condition}
//             </button>
//         ))}
//     </div>
// </div>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// }

// export default DentalCanvas;



import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";

const upperTeeth = [
    18, 17, 16, 15, 14, 13, 12, 11,
    21, 22, 23, 24, 25, 26, 27, 28
];

const lowerTeeth = [
    48, 47, 46, 45, 44, 43, 42, 41,
    31, 32, 33, 34, 35, 36, 37, 38
];

function Tooth({
    number,
    selected,
    condition,
    onClick,
    upper = true,
}) {
    const conditionColors = {
        Healthy: "#ffffff",
        Caries: "#ffd6d6",
        RCT: "#d8ecff",
        Crown: "#fff0b8",
        Extraction: "#eadcff",
        Missing: "#e9e9e9",
    };

    const conditionBorders = {
        Healthy: "#aebdca",
        Caries: "#dc3545",
        RCT: "#007bff",
        Crown: "#d39e00",
        Extraction: "#7b3fc6",
        Missing: "#777",
    };

    return (
        <div
            onClick={() => onClick(number)}
            style={{
                width: "58px",
                minWidth: "58px",
                textAlign: "center",
                cursor: "pointer",
                userSelect: "none",
                WebkitTapHighlightColor: "transparent",
            }}
        >
            <div
                style={{
                    fontSize: "12px",
                    fontWeight: selected ? "700" : "500",
                    color: selected ? "#0056b3" : "#555",
                    marginBottom: "7px",
                }}
            >
                {number}
            </div>

            <div
                style={{
                    position: "relative",
                    width: "48px",
                    height: "58px",
                    margin: "0 auto",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: "0",
                        background:
                            conditionColors[condition] || "#fff",

                        border: selected
                            ? "3px solid #0056b3"
                            : `2px solid ${
                                  conditionBorders[condition] ||
                                  "#aebdca"
                              }`,

                        borderRadius: upper
                            ? "48% 48% 42% 42% / 42% 42% 58% 58%"
                            : "42% 42% 48% 48% / 58% 58% 42% 42%",

                        boxShadow: selected
                            ? "0 0 14px rgba(0,86,179,.35)"
                            : "0 2px 5px rgba(0,0,0,.08)",

                        transition: "all .15s ease",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        width: "18px",
                        height: "18px",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        border:
                            "1px solid rgba(120,140,155,.45)",
                        borderRadius: "50%",
                        background:
                            condition === "Caries"
                                ? "#ff8c8c"
                                : condition === "RCT"
                                ? "#80c7ff"
                                : condition === "Crown"
                                ? "#ffd85c"
                                : "#f8fbfd",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        width: "1px",
                        height: "30px",
                        left: "50%",
                        top: "14px",
                        transform: "translateX(-50%)",
                        background:
                            "rgba(120,140,155,.35)",
                    }}
                />
            </div>
        </div>
    );
}

function DentalCanvas() {
    const canvasRef = useRef(null);

    const [activeMode, setActiveMode] = useState("draw");
    const [isDrawing, setIsDrawing] = useState(false);
    const [brushColor, setBrushColor] = useState("#0056b3");
    const [brushSize, setBrushSize] = useState(4);
    const [selectedTooth, setSelectedTooth] = useState(null);

    const [toothConditions, setToothConditions] = useState({});

    const setToothCondition = (condition) => {
        if (!selectedTooth) return;

        setToothConditions((prev) => ({
            ...prev,
            [selectedTooth]: condition,
        }));
    };

    /* =========================
       CANVAS SETUP
    ========================= */

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = brushColor;
        ctx.lineWidth = brushSize;
    }, [brushColor, brushSize]);

    /* =========================
       GET POINTER POSITION
    ========================= */

    const getPosition = (e) => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return { x: 0, y: 0 };
        }

        const rect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY,
        };
    };

    /* =========================
       START DRAWING
    ========================= */

    const startDrawing = (e) => {
        if (activeMode !== "draw") return;

        e.preventDefault();

        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        const { x, y } = getPosition(e);

        ctx.beginPath();
        ctx.moveTo(x, y);

        setIsDrawing(true);

        /*
          Important for mobile:
          Pointer capture keeps drawing active
          even if finger moves slightly outside canvas.
        */
        if (canvas.setPointerCapture) {
            canvas.setPointerCapture(e.pointerId);
        }
    };

    /* =========================
       DRAW
    ========================= */

    const draw = (e) => {
        if (!isDrawing || activeMode !== "draw") return;

        e.preventDefault();

        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        const { x, y } = getPosition(e);

        ctx.lineTo(x, y);
        ctx.stroke();
    };

    /* =========================
       STOP DRAWING
    ========================= */

    const stopDrawing = (e) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;

        if (canvas) {
            const ctx = canvas.getContext("2d");
            ctx.closePath();

            if (
                e &&
                canvas.releasePointerCapture &&
                canvas.hasPointerCapture?.(e.pointerId)
            ) {
                canvas.releasePointerCapture(e.pointerId);
            }
        }

        setIsDrawing(false);
    };

    /* =========================
       CLEAR CANVAS
    ========================= */

    const clearCanvas = () => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );
    };

    const selectTooth = (number) => {
        setSelectedTooth(number);
    };

    return (
        <>
            <Header />

            <div
                style={{
                    padding: "clamp(10px, 3vw, 25px)",
                    background: "#f5f9ff",
                    minHeight: "100vh",
                    boxSizing: "border-box",
                    overflowX: "hidden",
                }}
            >

                {/* =========================
                    PAGE HEADER
                ========================= */}

                <div
    style={{
        background: "#fff",
        padding: "clamp(16px, 3vw, 24px)",
        borderRadius: "15px",
        marginBottom: "20px",
        boxShadow: "0 4px 15px rgba(0,0,0,.08)",
        border: "1px solid #e6eef7",
    }}
>
    <h2
        style={{
            margin: 0,
            color: "#0056b3",
            fontSize: "clamp(20px, 3vw, 28px)",
            fontWeight: "700",
            lineHeight: "1.3",
        }}
    >
        🦷 Dental Canvas Playground
    </h2>

    <p
        style={{
            margin: "8px 0 0",
            color: "#777",
            fontSize: "clamp(13px, 1.8vw, 16px)",
            lineHeight: "1.5",
        }}
    >
        Drawing aur Dental Tooth Chart dono ek hi jagah
    </p>
</div>
                {/* =========================
                    MODE BUTTONS
                ========================= */}

                <div
                    style={{
                        background: "#fff",
                        padding: "15px",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "20px",
                        boxShadow:
                            "0 4px 15px rgba(0,0,0,.08)",
                        flexWrap: "wrap",
                    }}
                >
                    <button
                        onClick={() => setActiveMode("draw")}
                        style={{
                            background:
                                activeMode === "draw"
                                    ? "#0056b3"
                                    : "#eef5ff",
                            color:
                                activeMode === "draw"
                                    ? "#fff"
                                    : "#0056b3",
                            border: "none",
                            padding: "10px 18px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "600",
                            flex: "1 1 150px",
                        }}
                    >
                        ✏️ Draw
                    </button>

                    <button
                        onClick={() => {
                            setActiveMode("teeth");
                            setIsDrawing(false);
                        }}
                        style={{
                            background:
                                activeMode === "teeth"
                                    ? "#0056b3"
                                    : "#eef5ff",
                            color:
                                activeMode === "teeth"
                                    ? "#fff"
                                    : "#0056b3",
                            border: "none",
                            padding: "10px 18px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "600",
                            flex: "1 1 150px",
                        }}
                    >
                        🦷 Tooth Chart
                    </button>
                </div>

                {/* =========================
                    DRAW MODE
                ========================= */}

                {activeMode === "draw" && (
                    <>
                        <div
                            style={{
                                background: "#fff",
                                padding: "15px",
                                borderRadius: "12px",
                                display: "flex",
                                alignItems: "center",
                                gap: "20px",
                                marginBottom: "20px",
                                boxShadow:
                                    "0 4px 15px rgba(0,0,0,.08)",
                                flexWrap: "wrap",
                            }}
                        >
                            <label
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                }}
                            >
                                Color:

                                <input
                                    type="color"
                                    value={brushColor}
                                    onChange={(e) =>
                                        setBrushColor(
                                            e.target.value
                                        )
                                    }
                                />
                            </label>

                            <label
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    flex: "1 1 200px",
                                }}
                            >
                                Brush Size:

                                <input
                                    type="range"
                                    min="1"
                                    max="30"
                                    value={brushSize}
                                    onChange={(e) =>
                                        setBrushSize(
                                            Number(e.target.value)
                                        )
                                    }
                                    style={{
                                        width: "100%",
                                        maxWidth: "200px",
                                    }}
                                />
                            </label>

                            <button
                                onClick={clearCanvas}
                                style={{
                                    background: "#dc3545",
                                    color: "#fff",
                                    border: "none",
                                    padding: "9px 18px",
                                    borderRadius: "7px",
                                    cursor: "pointer",
                                }}
                            >
                                🗑️ Clear
                            </button>
                        </div>

                        <div
                            style={{
                                background: "#fff",
                                padding: "clamp(8px, 2vw, 15px)",
                                borderRadius: "12px",
                                boxShadow:
                                    "0 4px 15px rgba(0,0,0,0.08)",
                            }}
                        >
                            <canvas
                                ref={canvasRef}
                                width={1000}
                                height={600}

                                /* TOUCH + MOUSE BOTH */
                                onPointerDown={startDrawing}
                                onPointerMove={draw}
                                onPointerUp={stopDrawing}
                                onPointerCancel={stopDrawing}
                                onPointerLeave={(e) => {
                                    /*
                                      Desktop mouse ke liye
                                      stop kar sakte hain,
                                      lekin mobile pointer capture
                                      drawing continue rakhega.
                                    */
                                    if (
                                        e.pointerType === "mouse"
                                    ) {
                                        stopDrawing(e);
                                    }
                                }}

                                style={{
                                    display: "block",
                                    width: "100%",
                                    height: "auto",
                                    border:
                                        "2px solid #dbe7f5",
                                    borderRadius: "8px",
                                    cursor: "crosshair",
                                    background: "#fff",

                                    /*
                                      VERY IMPORTANT:
                                      Mobile browser canvas ko
                                      scroll/zoom na kare.
                                    */
                                    touchAction: "none",

                                    userSelect: "none",
                                    WebkitUserSelect: "none",
                                }}
                            />
                        </div>
                    </>
                )}

                {/* =========================
                    TOOTH CHART MODE
                ========================= */}

                {activeMode === "teeth" && (
                    <div
                        style={{
                            display: "grid",

                            /*
                              Desktop:
                              chart + information side by side

                              Mobile:
                              CSS media query ke through
                              single column.
                            */
                            gridTemplateColumns:
                                "minmax(0, 1fr) 280px",

                            gap: "20px",
                            alignItems: "start",
                        }}
                        className="dental-teeth-layout"
                    >

                        {/* =========================
                            TOOTH CHART
                        ========================= */}

                        <div
                            style={{
                                background: "#fff",
                                borderRadius: "15px",
                                padding:
                                    "clamp(20px, 4vw, 35px) 15px",
                                boxShadow:
                                    "0 4px 15px rgba(0,0,0,.08)",
                                overflowX: "auto",
                                WebkitOverflowScrolling: "touch",
                            }}
                        >
                            <h3
                                style={{
                                    textAlign: "center",
                                    color: "#0056b3",
                                    marginTop: 0,
                                }}
                            >
                                UPPER ARCH
                            </h3>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    minWidth: "950px",
                                    paddingBottom: "5px",
                                }}
                            >
                                {upperTeeth.map((number) => (
                                    <Tooth
                                        key={number}
                                        number={number}
                                        selected={
                                            selectedTooth === number
                                        }
                                        condition={
                                            toothConditions[number]
                                        }
                                        onClick={selectTooth}
                                        upper={true}
                                    />
                                ))}
                            </div>

                            <div
                                style={{
                                    height: "1px",
                                    background: "#dce7f2",
                                    margin: "35px 0",
                                }}
                            />

                            <h3
                                style={{
                                    textAlign: "center",
                                    color: "#0056b3",
                                }}
                            >
                                LOWER ARCH
                            </h3>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    minWidth: "950px",
                                    paddingBottom: "5px",
                                }}
                            >
                                {lowerTeeth.map((number) => (
                                    <Tooth
                                        key={number}
                                        number={number}
                                        selected={
                                            selectedTooth === number
                                        }
                                        condition={
                                            toothConditions[number]
                                        }
                                        onClick={selectTooth}
                                        upper={false}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* =========================
                            INFORMATION PANEL
                        ========================= */}

                        <div
                            style={{
                                background: "#fff",
                                borderRadius: "15px",
                                padding: "22px",
                                boxShadow:
                                    "0 4px 15px rgba(0,0,0,.08)",
                                minWidth: 0,
                            }}
                        >
                            <h3
                                style={{
                                    marginTop: 0,
                                    color: "#0056b3",
                                }}
                            >
                                Tooth Information
                            </h3>

                            {!selectedTooth ? (
                                <div
                                    style={{
                                        color: "#888",
                                        lineHeight: "1.6",
                                    }}
                                >
                                    🦷
                                    <br />
                                    Select a tooth from the chart.
                                </div>
                            ) : (
                                <>
                                    <div
                                        style={{
                                            background: "#eaf6ff",
                                            borderRadius: "10px",
                                            padding: "15px",
                                            marginBottom: "15px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: "13px",
                                                color: "#777",
                                            }}
                                        >
                                            Selected Tooth
                                        </div>

                                        <div
                                            style={{
                                                fontSize: "32px",
                                                fontWeight: "700",
                                                color: "#0056b3",
                                            }}
                                        >
                                            {selectedTooth}
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            padding: "12px",
                                            border:
                                                "1px solid #e5e5e5",
                                            borderRadius: "9px",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <strong>
                                            Tooth Number:
                                        </strong>{" "}
                                        {selectedTooth}
                                    </div>

                                    <div
                                        style={{
                                            padding: "12px",
                                            border:
                                                "1px solid #e5e5e5",
                                            borderRadius: "9px",
                                        }}
                                    >
                                        <strong>Status:</strong>{" "}
                                        {toothConditions[
                                            selectedTooth
                                        ] || "Healthy"}
                                    </div>

                                    {/* CONDITION */}

                                    <div
                                        style={{
                                            marginTop: "15px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontWeight: "600",
                                                marginBottom: "10px",
                                                color: "#333",
                                            }}
                                        >
                                            Condition
                                        </div>

                                        <div
                                            style={{
                                                display: "grid",
                                                gridTemplateColumns:
                                                    "1fr 1fr",
                                                gap: "8px",
                                            }}
                                        >
                                            {[
                                                "Healthy",
                                                "Caries",
                                                "RCT",
                                                "Crown",
                                                "Extraction",
                                                "Missing",
                                            ].map(
                                                (condition) => (
                                                    <button
                                                        key={
                                                            condition
                                                        }
                                                        onClick={() =>
                                                            setToothCondition(
                                                                condition
                                                            )
                                                        }
                                                        style={{
                                                            padding:
                                                                "9px 5px",
                                                            borderRadius:
                                                                "7px",
                                                            border:
                                                                toothConditions[
                                                                    selectedTooth
                                                                ] ===
                                                                condition
                                                                    ? "2px solid #0056b3"
                                                                    : "1px solid #ddd",

                                                            background:
                                                                toothConditions[
                                                                    selectedTooth
                                                                ] ===
                                                                condition
                                                                    ? "#eaf6ff"
                                                                    : "#fff",

                                                            color: "#333",
                                                            cursor:
                                                                "pointer",
                                                            fontWeight:
                                                                toothConditions[
                                                                    selectedTooth
                                                                ] ===
                                                                condition
                                                                    ? "600"
                                                                    : "400",
                                                        }}
                                                    >
                                                        {
                                                            condition
                                                        }
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* =========================
                RESPONSIVE CSS
            ========================= */}

            <style>
                {`
                    * {
                        box-sizing: border-box;
                    }

                    .dental-teeth-layout {
                        width: 100%;
                    }

                    @media (max-width: 768px) {

                        .dental-teeth-layout {
                            grid-template-columns: 1fr !important;
                        }

                        .dental-teeth-layout > div:first-child {
                            width: 100%;
                        }

                        .dental-teeth-layout > div:last-child {
                            width: 100%;
                        }
                    }

                    @media (max-width: 500px) {

                        .dental-teeth-layout {
                            gap: 15px !important;
                        }

                        .dental-teeth-layout h3 {
                            font-size: 17px !important;
                        }

                        .dental-teeth-layout > div:last-child {
                            padding: 17px !important;
                        }
                    }

                    @media (max-width: 400px) {

                        .dental-teeth-layout > div:first-child {
                            padding-left: 8px !important;
                            padding-right: 8px !important;
                        }
                    }
                `}
            </style>
        </>
    );
}

export default DentalCanvas;