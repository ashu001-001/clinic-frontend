// import { EffectComposer, Bloom } from "@react-three/postprocessing";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Float, Stars } from "@react-three/drei";
// import { useRef } from "react";
// import { Environment } from "@react-three/drei";
// import { OrbitControls } from "@react-three/drei";
// import { CameraControls } from "@react-three/drei";






// function MedicalLogo() {
//   const group = useRef();

//   useFrame((state) => {
//     group.current.rotation.y += 0.004;
//     group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
//   });

//   return (
//     <group ref={group}>
//       {/* Vertical */}
//       <mesh>
//         <boxGeometry args={[0.5, 3, 0.4]} />
//         <meshStandardMaterial
//           color="#00d4ff"
//           emissive="#00d4ff"
//           emissiveIntensity={1}
//         />
//       </mesh>

//       {/* Horizontal */}
//       <mesh>
//         <boxGeometry args={[3, 0.5, 0.4]} />
//         <meshStandardMaterial
//           color="#00d4ff"
//           emissive="#00d4ff"
//           emissiveIntensity={1}
//         />
//       </mesh>
//     </group>
//   );
// }

// export default function ThreeScene() {
//   return (
//     <Canvas
//       camera={{
//     position: [0, 2, 8],
//     fov: 45,
//   }}
//       style={{
//         position: "absolute",
//         inset: 0,
//         zIndex: 1,
//       }}
//     >
//       <color attach="background" args={["#07182E"]} />

//       <fog attach="fog" args={["#07182E", 8, 20]} />

//       <ambientLight intensity={0.8} />

// <pointLight
//   position={[5, 5, 5]}
//   intensity={30}
//   color="#00d4ff"
// />

// <pointLight
//   position={[-5, -3, 5]}
//   intensity={20}
//   color="#3b82f6"
// />

// <Environment preset="city"/>

// <Float
// speed={2}
// rotationIntensity={1}
// floatIntensity={2}
// >




// </Float>

      
// <Stars
//   radius={120}
//   depth={60}
//   count={8000}
//   factor={7}
//   saturation={0}
//   fade
//   speed={1}
// />

// <CameraControls
//   makeDefault
//   minDistance={6}
//   maxDistance={8}
// />

//      <MedicalLogo />
//       <EffectComposer>
//   <Bloom
//     intensity={1.5}
//     luminanceThreshold={0.2}
//     luminanceSmoothing={0.9}
//   />
// </EffectComposer>
//     </Canvas>
//   );
// }

import { Canvas, useFrame } from "@react-three/fiber";
import {   Float,  Stars,  OrbitControls,} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef } from "react";

function Cross() {
  const ref = useRef();

  useFrame((state) => {
    ref.current.rotation.y += 0.003;
    ref.current.rotation.x =
      Math.sin(state.clock.elapsedTime) * 0.15;
  });

  return (
    <Float speed={2} floatIntensity={2}>
      <group ref={ref}>
        <mesh>
          <boxGeometry args={[0.5, 2, 0.4]} />
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={2}
          />
        </mesh>

        <mesh>
          <boxGeometry args={[2, 0.5, 0.4]} />
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={2}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
      }}
    >
      <color attach="background" args={["#020617"]} />
      <fog attach="fog" args={["#020617", 8, 25]} />

      <ambientLight intensity={0.5} />

      <pointLight
        position={[5, 5, 5]}
        intensity={60}
        color="#00bfff"
      />

      <pointLight
        position={[-5, -5, 5]}
        intensity={30}
        color="#2563eb"
      />

      <Stars
        radius={120}
        depth={80}
        count={11000}
        factor={7}
        fade
      />

      <Cross />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.4}
      />

      <EffectComposer>
        <Bloom
          intensity={2}
          luminanceThreshold={0.1}
        />
      </EffectComposer>
    </Canvas>
  );
}