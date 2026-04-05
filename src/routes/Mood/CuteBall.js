import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Physics, usePlane, useSphere } from "@react-three/cannon"
import { EffectComposer, SSAO, Bloom } from "@react-three/postprocessing"
import {motion, AnimatePresence} from "framer-motion";
import "../../style/newApp.css"

export default function App() {
  return (
        <motion.div className="talk-cute"
            key="star"
            initial={{opacity:0}}
            animate={{opacity:1,
                transition:{
                    duration:7, type:'ease-in'
                }
            }}
            exit={{opacity:0, x:-100, 
                transition:{
                    duration:1
                }
            }}
            
        >
            <Canvas shadows gl={{ stencil: false, antialias: false }} camera={{ position: [0, 0, 30], fov: 50, near: 17, far: 40 }}>
      <fog attach="fog" args={["red", 25, 32]} />
      <color attach="background" args={["#FEC578"]} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <directionalLight
        
        intensity={2}
        position={[50, 50, 25]}
        shadow-mapSize={[128, 128]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <Physics gravity={[0, -80, 0]} defaultContactMaterial={{ restitution: 0.5 }}>
        <group position={[0, 0, -10]}>
          <Mouse />
          <Borders />
          <InstancedSpheres />
        </group>
      </Physics>
      <EffectComposer>
        <SSAO radius={0.2} intensity={30} luminanceInfluence={0.05} color="red" />
        <Bloom intensity={2} kernelSize={3} luminanceThreshold={0.6} luminanceSmoothing={0.05} />
      </EffectComposer>
    </Canvas>
        </motion.div>
   
  )
}

function InstancedSpheres({ count = 200 }) {
    const { viewport } = useThree()
    const [ref] = useSphere((index) => ({ mass: 50, position: [4 - Math.random() * 8, viewport.height, 0, 0], args: [1.2] }))
    return (
      <instancedMesh ref={ref} castShadow receiveShadow args={[null, null, count]}>
        <sphereBufferGeometry args={[1.2, 32, 32]} />
        <meshLambertMaterial color="#ff7b00" />
      </instancedMesh>
    )
  }
  
  function Borders() {
    const { viewport } = useThree()
    return (
      <>
        <Plane position={[0, -viewport.height / 2, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        <Plane position={[-viewport.width / 2 - 1, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
        <Plane position={[viewport.width / 2 + 1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
        <Plane position={[0, 0, -1]} rotation={[0, 0, 0]} />
        <Plane position={[0, 0, 12]} rotation={[0, -Math.PI, 0]} />
      </>
    )
  }
  
  function Plane({ color, ...props }) {
    usePlane(() => ({ ...props }))
    return null
  }
  
  function Mouse() {
    const { viewport } = useThree()
    const [, api] = useSphere(() => ({ type: "Kinematic", args: [6] }))
    return useFrame((state) => api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 7))
  }