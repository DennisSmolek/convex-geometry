import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Experience from "./Experience.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));

// Orbit Configuration
/* These are my prefered configurations for general demos.
** Adjusted to match the original demo
We use the spread operatior {...orbitConfig} to apply this config */
const orbitConfig = {
    enablePan: false,
    // Dont allow the camera to see under the floor
    maxPolarAngle: Math.PI / 2 - 0.1,
    // Distance is Perspective, Zoom is for Ortho
    maxDistance: 50,
    minDistance: 20,
    maxZoom: 100,
};

root.render(
    <Canvas shadows camera={{ fov: 40, position: [15, 20, 30] }}>
        <Experience />
        <OrbitControls makeDefault {...orbitConfig} />
        <Perf position='top-left' minimal className='perf' />
    </Canvas>
);
