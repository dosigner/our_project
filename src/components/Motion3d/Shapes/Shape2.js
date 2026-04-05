//import './style.css';

import {motion} from "framer-motion-3d";
import { MotionConfig, useSpring, useTransform } from "framer-motion";
import {transition} from "../settings";
import {Canvas, useThree} from "@react-three/fiber";
import {Stage} from "@react-three/drei";


import { useLayoutEffect, useRef, Suspense } from "react";

// 3d model
import {Heart} from '../../../Three_comp/Heart';
import {Tear} from '../../../Three_comp/Tear';

export function Shape2({isHover, isPress, mouseX, mouseY ,yes}){
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
                    <Lights type={yes}/>
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
                    {yes?(
                        <>
                            <Hearts/>
                        </>
                    ):(
                        <>
                            <Tears/>
                        </>
                    )}
                </motion.group>
            </MotionConfig>
        </Canvas>
    )
}

export function Lights({type}) {
    if(type){
        return (
            <>
              <spotLight color="#de2c76" position={[-10, -10, -10]} intensity={0.2} />
              <spotLight color="#de2c76" position={[10, 0, -15]} intensity={0.8} />
              <spotLight color="#de2c76" position={[-5, 20, 2]} intensity={0.5} />
              <spotLight color="#ffb10a" position={[-10, -15, -2]} intensity={2} />
              <spotLight color="#ffb10a" position={[15, 10, 5]} intensity={1} />
              <spotLight color="#95eb67" position={[5, 10, 5]} intensity={0.2} />
            </>
        );
    }
    else {
        return (
            <>
              <spotLight color="#8cadff" position={[10, 10, -10]} intensity={1} />
              <spotLight color="#8cadff" position={[10, 0, -15]} intensity={1} />
              <spotLight color="#8cadff" position={[-5, 20, 2]} intensity={0.5} />
              <spotLight color="#70cee6" position={[-3, 0, 5]} intensity={2} />
              <spotLight color="#70cee6" position={[-15, 10,-5]} intensity={1} />
              <spotLight color="#de8cff" position={[3, -10, 7]} intensity={0.2} />
              <ambientLight/>
            </>
        );
    }
    
}

export function Hearts(){
    return (
        <motion.mesh 
            position={[-0.3, -3, 0]} 
            variants={{
                hover: {
                    x:-0.3,
                    y:-0.1,
                    z:0,
                    scale:1.3
                }}
            }> {/* z 값 index 올라오기 */}
            <Suspense fallback={null}>
                <Heart scale={0.01} position={[1.2, 1, 0]} rotation={[0,0,-0.6]}/>
                <Heart scale={0.01} position={[0.5, -1.7, -3]} rotation={[0,0,-0.2]}/>
                <Heart scale={0.01} position={[-2.5, 1, -5]} rotation={[0,0,0.6]}/>            
            </Suspense>
        </motion.mesh>
    )
}


export function Tears(){
    return (
        <motion.mesh
            position={[0.3, -3, 0]} 
            variants={{
                hover: {
                    x:-0.3,
                    y:0.4,
                    z:0,
                    scale:1.2
                }}
            }>
            {/* [scale, fillet] */}
            <Suspense fallback={null}>
                <Tear scale={0.1} position={[-0.8, 0, 0.5]} rotation={[0,0,0.6]}/>
                <Tear scale={0.1} position={[-0.5, -1.6, -1]} rotation={[0,0,0.2]}/>
                <Tear scale={0.1} position={[1.6, 0.6, -1.2]} rotation={[0,0,-0.6]}/>    
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