import '../../style/App.css'

import {motion, AnimatePresence} from "framer-motion";
import { useRef, useEffect, useState, useLayoutEffect } from 'react';

import { MotionConfig, useSpring, useTransform } from "framer-motion";
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import {Points, PointMaterial} from "@react-three/drei"

import * as random from "maath/random/dist/maath-random.esm"

// database에 읽을 거 가져오기


function Starlight() {
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

    /*const sample = (isPress)=>{
        setTimeout(()=>{
            if(isPress){
                setIsPress(false);
            }
        },500);
    }*/
    
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
            <Canvas camera={{position:[0,0,2]}}>
                <Stars mousePos={mousePos} isPress={isPress}/>
            </Canvas>
        </motion.div>
    )
}

function Stars({mousePos, isPress}){
    const ref = useRef();
    const [fpsNum, setFpsNum] = useState(0);
    // Event에 대한 State

    // 1. MotionValue들은 useMotionValue hook으로 생성됨
    // 2. 인자로 MotionValue의 초기 값이 들어감

    const [sphere] = useState(() => random.inSphere(new Float32Array(4000), {radius:2}));
    useFrame((state,delta)=>{
        ref.current.rotation.x =mousePos.x/1000;
        ref.current.rotation.y = mousePos.y/1000;
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
        <group rotation={[0,0, Math.PI/4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial transparent color="#ffa4e4" size={0.008} sizeAttenuation={true} depthWrite={false}/>
            </Points>
        </group>
    )
}

const spring = { stiffness:800, damping:50 };

export default Starlight;