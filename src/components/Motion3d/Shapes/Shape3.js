//import './style.css';

import {motion} from "framer-motion-3d";
import { MotionConfig, useSpring, useTransform } from "framer-motion";
import {transition} from "../settings";
import {Canvas, useThree} from "@react-three/fiber";
import {Stage} from "@react-three/drei";


import { useLayoutEffect, useRef, Suspense } from "react";

// 3d model
import {Heart} from '../../../Three_comp/Heart';
import {TravelBag} from '../../../Three_comp/TravelBag';
import {Home} from '../../../Three_comp/Home';
import { Work } from "../../../Three_comp/Work";

export function Shape3({isHover, isPress, mouseX, mouseY ,str}){
    const lightRotateX = useSpring(useTransform(mouseY,(v) => (-1 * v) / 140), spring);
    const lightRotateY = useSpring(useTransform(mouseX,(v) => (-1 * v) / 140), spring);


    return (
        <Canvas shadows dpr={[1,2]} resize={{scroll: false, offsetSize :true}}>         
            <Camera mouseX={mouseX} mouseY={mouseY} />
            
            <MotionConfig transition={transition}>
                <motion.group
                    center={[0,0,0]}
                    rotation={[lightRotateY,lightRotateX,0]}
                >
                    <Lights type={str}/>
                </motion.group>

                <motion.group
                    initial={false}
                    animate={isHover?"hover":"rest"}
                    dispose={null}
                    variants={{
                        hover: {
                            z: isPress? -0.9:0
                        }
                    }}
                >
                    <Model str={str}/>
                </motion.group>
            </MotionConfig>
        </Canvas>
    )
}

export function Lights({str}) {
    if(str=="home"){
        return (
            <>
              <spotLight color="#eeeeee" position={[-10, -10, -10]} intensity={0.2} />
              <spotLight color="#eeeeee" position={[10, 0, -15]} intensity={0.8} />
              <spotLight color="#ffb19cz" position={[-5, 20, 2]} intensity={0.5} />
              <spotLight color="#ffffff" position={[10, 15, 2]} intensity={2} />
              <spotLight color="#ffe09c" position={[-15, -10, -5]} intensity={1} />
              <spotLight color="#ffffff" position={[5, 10, 5]} intensity={0.2} />
            </>
        );
    }
    else if(str=="trip"){
        return (
            <>
                <ambientLight/>
            </>
        )
    }
    else {
        return (
            <>
              <spotLight color="#cccccc" position={[10, 10, -10]} intensity={1} />
              <spotLight color="#8cadff" position={[10, 0, -15]} intensity={1} />
              <spotLight color="#8cafff" position={[-5, 20, 2]} intensity={0.5} />
              <spotLight color="#78ffff" position={[3, 0, -5]} intensity={2} />
              <spotLight color="#97ffff" position={[15, -10,5]} intensity={1} />
              <spotLight color="#aaaaaa" position={[3, -10, 7]} intensity={0.2} />
              <ambientLight/>
            </>
        );
    }
    
}
export const Model = ({str}) => {
    if(str==="local"){
        return <Homes/>
    }
    else if(str==="trip"){
        return <Trips/>
    }
    else if(str==="work"){
        return <Works/>
    }
}

export function Homes(){
    return (
        <motion.mesh 
            position={[-0.3, -3, 0]} 
            variants={{
                hover: {
                    x:-0.3,
                    y:-0.1,
                    z:0,
                    scale:1.5
                }}
            }> {/* z 값 index 올라오기 */}
            <Suspense fallback={null}>
                <Home scale={0.03} position={[0, 0.5, -5]} rotation={[1.5,-1.8,1.1]}/>            
            </Suspense>
        </motion.mesh>
    )
}


export function Trips(){
    return (
        <motion.mesh
            position={[-1, -3, 0]} 
            variants={{
                hover: {
                    x:-0.3,
                    y:0.4,
                    z:0,
                    scale:1.4
                }}
            }>
            {/* [scale, fillet] */}
            <Suspense fallback={null}>
                <TravelBag scale={0.01} position={[0, -0.2, -5]} rotation={[0.5,0.5,-0.2]}/>
            </Suspense>
        </motion.mesh>
    )
}

export function Works(){
    return (
        <motion.mesh
            position={[-1, -3, 0]} 
            variants={{
                hover: {
                    x:-0.3,
                    y:0.4,
                    z:0,
                    scale:1.4
                }}
            }>
            {/* [scale, fillet] */}
            <Suspense fallback={null}>
                <Work scale={0.01} position={[0, -4, -15]} rotation={[-3.1,0.4,-3.1]}/>
            </Suspense>
        </motion.mesh>
    )
}

function Camera({mouseX, mouseY, ...props}){

    const cameraX = useSpring(useTransform(mouseX, (x)=>-x/350), spring);
    const cameraY = useSpring(useTransform(mouseY, (y)=>(1*y/350)), spring);

    const set = useThree( ({set}) => set);
    const camera = useThree(({camera}) => camera );
    const size = useThree(({size}) => size);
    const scene = useThree(({scene}) => scene );

    const cameraRef = useRef();

    // camera 초기화 과정, size만 계속 영향받고 나머지는 X
    useLayoutEffect(() => {
        const {current:cam} = cameraRef;
        if(cam){
            cam.aspect = size.width / size.height;
            cam.updateProjectionMatrix();
        }
    }, [size, props]);

    // cameraRef가 존재하면 -> camera를 oldCam으로 설정하고 
    // 현재 camera를 cameraRef.currrent로 설정
    // camera를 oldCam으로 설정
    // camera, cameraRef, set 3가지만 update
    useLayoutEffect(()=> {
        if(cameraRef.current){
            const oldCam = camera;
            set(()=> ({camera: cameraRef.current}));
            return () => set(()=>({camera: oldCam})); 
        }
    },[camera, cameraRef, set]);

    // cameraX의 값 변경
    useLayoutEffect(() => {
        return cameraY.onChange(() => camera.lookAt(scene.position) );
    }, [cameraY]);

    return (
        <motion.perspectiveCamera
            /* cameraRef는 이제 persepctiveCamera를 가르침 */
            ref={cameraRef}
            fov={90}
            /* cameraX와, cameraY 값에 의해 rerender */
            position={[cameraY,cameraX, 4]}
        />
    );
}

const spring = { stiffness:800, damping:50 };