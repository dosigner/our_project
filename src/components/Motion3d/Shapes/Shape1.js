//import './style.css';

import {motion} from "framer-motion-3d";
import { MotionConfig, useSpring, useTransform } from "framer-motion";
import {transition} from "../settings";
import {Canvas, useThree} from "@react-three/fiber";

import { useLayoutEffect, useRef, Suspense } from "react";

// 3d model
import {Spoon} from '../../../Three_comp/Spoon'
import {Fork} from '../../../Three_comp/Fork'
import {CupPlate} from '../../../Three_comp/CupPlate'
import {Cup} from '../../../Three_comp/Cup'

export function Shape1({isHover, isPress, mouseX, mouseY ,yes}){
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
                            <PlateModel/>
                            <CupModel/>  
                        </>
                    ):(
                        <>
                            <SpoonModel/>
                            <ForkModel/>
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
              <spotLight color="#82ff88" position={[10, 10, 10]} intensity={0.2} />
              <spotLight color="#82ff88" position={[10, 0, -15]} intensity={0.8} />
              <spotLight color="#82ff88" position={[-5, 20, 2]} intensity={0.5} />
              <spotLight color="#3dd5ff" position={[10, 15, 2]} intensity={2} />
              <spotLight color="#3dd5ff" position={[-15, -10, 2]} intensity={1} />
              
            </>
        );
    }
    else {
        return (
            <>
              <spotLight color="#db07d1" position={[-10, -10, -10]} intensity={0.2} />
              <spotLight color="#db07d1" position={[10, 0, -15]} intensity={0.8} />
              <spotLight color="#db07d1" position={[-5, 20, 2]} intensity={0.5} />
              <spotLight color="#f2056f" position={[-10, -15, -2]} intensity={2} />
              <spotLight color="#f2056f" position={[15, 10, 5]} intensity={1} />
              <spotLight color="#d98852" position={[5, 10, 5]} intensity={0.2} />
            </>
        );
    }
    
}

export function SpoonModel(){
    return (
        <motion.mesh 
            position={[-0.3, -0.1, 0]} 
            variants={{
                hover: {
                    z:2.3,
                    rotateX: 3.14/2,
                    rotateY: -3.14*3/4,
                    rotateZ: 0.1,
                }}
            }> {/* z 값 index 올라오기 */}
            <Suspense fallback={null}>
                <Spoon scale={0.12}/>
            </Suspense>
        </motion.mesh>
    )
}

export function ForkModel() {
    return (
        <motion.mesh
            position={[-2, -2, -3]}
            variants={{
                hover: {
                    x:-0.5,
                    y:0.3,
                    z:0,
                    rotateX: 3.14/2,
                    rotateY: 3.14*3/4,
                    rotateZ: 0,
                }
            }}
        >
            {/*[반지름, 높이, segment 순 ] */}
            <Suspense fallback={null}>
                <Fork scale={0.2}/>
            </Suspense>
        </motion.mesh>
    )
}

export function PlateModel(){
    return (
        <motion.mesh
            position={[2, 0.8, 0]}
            rotation={[-0.5, 0.5, 0]}
            variants={{
                hover: {
                    x:-0.4,
                    y:-1, 
                    z:-0.5, 
                    rotateX: 1,
                    rotateY: 0.2,
                    rotateZ: -0.3
                }
            }}
            >
                {/* 외경, 내경, 안의 segment, 밖의 segment */}
                <Suspense fallback={null}>
                    <CupPlate scale={0.15}/>
                </Suspense>
            </motion.mesh>
    )
}

export function CupModel(){
    return (
        <motion.mesh
            position={[-2, -2, 2]}
            rotation={[-1, -1.5, 0.3]}
            variants={{
                hover:{
                    x:0.2,
                    y:0.3,
                    z:1,
                    rotateX: 1.2,
                    rotateY: 0,
                    rotateZ: -0.3
                }
            }}
        >
            {/* [scale, fillet] */}
            <Suspense fallback={null}>
                    <Cup scale={0.1}/>
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