import '../../style/App.css'

import {motion, AnimatePresence} from "framer-motion";
import { useRef, useEffect, useState, useLayoutEffect } from 'react';

import { useNavigate } from 'react-router-dom';


import { MotionConfig, useSpring, useTransform } from "framer-motion";
import {Canvas, useFrame, extend} from "@react-three/fiber";
import { useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from "three";

export const ImageFadeMaterial = shaderMaterial(
    {
      effectFactor: 1.2,
      dispFactor: 0,
      tex: undefined,
      tex2: undefined,
      disp: undefined
    },
    ` varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }`,
    ` varying vec2 vUv;
      uniform sampler2D tex;
      uniform sampler2D tex2;
      uniform sampler2D disp;
      uniform float _rot;
      uniform float dispFactor;
      uniform float effectFactor;
      void main() {
        vec2 uv = vUv;
        vec4 disp = texture2D(disp, uv);
        vec2 distortedPosition = vec2(uv.x ${"+"} dispFactor * (disp.r*effectFactor), uv.y);
        vec2 distortedPosition2 = vec2(uv.x ${"-"} (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
        vec4 _texture = texture2D(tex, distortedPosition);
        vec4 _texture2 = texture2D(tex2, distortedPosition2);
        vec4 finalTexture = mix(_texture, _texture2, dispFactor);
        gl_FragColor = finalTexture;
        #include <tonemapping_fragment>
        #include <encodings_fragment>
      }`
  )
  
extend({ ImageFadeMaterial })

function Beach() {
    const [mousePos, setMousePos] = useState({});
    const [isPress, setIsPress] = useState(false);
    const [isHover, setIsHover] = useState(false);
    let navigate = useNavigate();
    return (
      <>
      
        <motion.div className="talk"
            initial={{opacity:0, }}
            animate={{opacity:1,transition:{duration:3, type:'ease-out'}}}
            exit={{opacity:0, x:-100, 
                transition:{
                    duration:3
                }
            }}
        >
            <Canvas style={{width:"1920px",height:"1080px"}} camera={{ position: [0, 0, 1.8], fov: 15 }}>
                <FadingImage />
            </Canvas>
        </motion.div>
          <motion.div
            className="bell"
            whileHover={{scale:1.5, opacity:1}}
            whileTap={{scale:0.9}}
            onHoverStart={()=>{
              setIsHover(true);
            }}
            onTap={()=>{
              navigate("/mood");
            }}
          >
          </motion.div>
        </>
    )
}

function FadingImage() {
    const ref = useRef()
    const [fpsNum, setFpsNum] = useState(0);
    
    const [texture1, texture2, dispTexture] = useTexture(["/img/Before2.png", "/img/After2.png", "/img/displacement/15.png"])
    const [hovered, setHover] = useState(false);
    const [hovered2, setHover2] = useState(false)

    useFrame((state,delta)=>{
        if(hovered||fpsNum!=0){
            setFpsNum(fpsNum+1);
            if(fpsNum==14){
                setFpsNum(0);
            }
            setHover2(true);
        }
        else{
            setHover2(false);
        }
    })

    useFrame(() => {
      ref.current.dispFactor = THREE.MathUtils.lerp(ref.current.dispFactor, hovered2 ? 1 : 0, 0.02)
    })
    return (
      <mesh onPointerDown={(e) => setHover(true)} onPointerUp={(e) => setHover(false)}>
        <planeGeometry position={[200,100,0]}/>
        <imageFadeMaterial ref={ref} tex={texture1} tex2={texture2} disp={dispTexture} toneMapped={false} />
      </mesh>
    )
  }


const spring = { stiffness:800, damping:50 };

export default Beach;