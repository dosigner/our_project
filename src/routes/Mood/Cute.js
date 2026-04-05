import '../../style/App.css'

import {motion, AnimatePresence} from "framer-motion";
import { useRef, Suspense, useEffect, useState, useLayoutEffect } from 'react';

import { MathUtils} from 'three';
import {Canvas, useFrame} from "@react-three/fiber";
import { Instances, Instance, Environment, ContactShadows } from '@react-three/drei'
import { EffectComposer, SSAO } from '@react-three/postprocessing'



import * as random from "maath/random/dist/maath-random.esm"

// database에 읽을 거 가져오기
const particles = Array.from({ length: 100 }, () => ({
    factor: MathUtils.randInt(20, 100),
    speed: MathUtils.randFloat(0.01, 1),
    xFactor: MathUtils.randFloatSpread(80),
    yFactor: MathUtils.randFloatSpread(60),
    zFactor: MathUtils.randFloatSpread(60)
}))

function Cute() {
    const [mousePos, setMousePos] = useState({});
    const [isPress, setIsPress] = useState(false);

    useEffect(()=>{
        const handleMouseMove = (e) => {
            setMousePos({x:960-e.clientX, y:540-e.clientY});
        };

        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            window.removeEventListener('mousemove',handleMouseMove);
        };
    }, []);
    
    return (
        <motion.div className="talk"
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
            onTapStart={()=>{setIsPress(true)}}
            onTap={()=>{
                setIsPress(false);
            }}
        >
            <Canvas shadows dpr={[1,2]} gl={{antialias:false}} camera={{fov:150, near:10, far:200, position:[0,100,100]}}>
                <color attach="background" args={['#f2f2f2']}/>
                <fog attach="fog" args={['white',60,150]}/>
                <ambientLight intensity={1.5}/>
                <pointLight position={[100,10-50]} intensity={20} castShadow/>
                <pointLight position={[-100, -100, -100]} intensity={10} color="orange"/>
                <Bubbles mousePos={mousePos} isPress={isPress}/>
                <ContactShadows position={[0, -30, 0]} opacity={0.6} scale={130} blur={1} far={40} />
                <Suspense fallback={null}>
                    <Environment preset="city" />
                </Suspense>

            </Canvas>
        </motion.div>
    )
}

function Bubbles({mousePos, isPress}) {
    const ref = useRef()
    const [fpsNum, setFpsNum] = useState(0);
    useFrame((state,delta)=>{
        ref.current.rotation.x = -mousePos.y/1000;
        ref.current.rotation.y = -mousePos.x/1000;
        if(isPress||fpsNum!=0){
            console.log(fpsNum);
            setFpsNum(fpsNum+1);
            if(fpsNum==29){
                setFpsNum(0);
            }
            ref.current.position.z-=delta;
        }
        else{
            if(ref.current.position.z<0){
                ref.current.position.z+=delta*10;
            }
        }
    })

    return (
      <Instances limit={particles.length} ref={ref} castShadow receiveShadow position={[0, 10, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial roughness={0.1} color="#ff5258" />
        {particles.map((data, i) => (
          <Bubble key={i} {...data} />
        ))}
      </Instances>
    )
}
  
function Bubble({ factor, speed, xFactor, yFactor, zFactor }) {
    const ref = useRef()
    useFrame((state) => {
        const t = factor + state.clock.elapsedTime * (speed / 2)
        ref.current.scale.setScalar(Math.max(1.5, Math.cos(t) * 5))
        ref.current.position.set(
            Math.cos(t) + Math.sin(t * 1) / 10 + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
            Math.sin(t) + Math.cos(t * 2) / 10 + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
            Math.sin(t) + Math.cos(t * 2) / 10 + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
        )
    })
    return <Instance ref={ref} />
}

const spring = { stiffness:800, damping:50 };

export default Cute;