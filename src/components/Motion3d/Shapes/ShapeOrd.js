import {motion} from "framer-motion-3d";
import {MotionConfig, useSpring, useTransform} from "framer-motion";
import {transition} from "../settings";
import {Canvas, useThree} from "@react-three/fiber";

import { useLayoutEffect, useRef, Suspense } from "react";
import {DirectionArrow} from '../../../Three_comp/Direction_arrow'
import { TableFolder } from "../../../Three_comp/TableFolder";


// 3d model
//import {Next} from '../../../Three_comp/Next';
//import {Previous} from '../../../Three_comp/Previous';
//import {OrderBtn} from '../../../Three_comp/OrderBtn';

export function ShapeOrd({isHover, isPress, mouseX, mouseY, text}){
    const lightRotateX = useSpring(useTransform(mouseY,(v) => (-1 * v) / 140), spring);
    const lightRotateY = useSpring(useTransform(mouseX,(v) => (-1 * v) / 140), spring);

    return (
        <Canvas shadows dpr={[1,2]} resize={{scroll: false, offsetSize :true}}>
            <Camera mouseX={mouseX} mouseY={mouseY}/>
            
            <MotionConfig transition={transition}>
                <motion.group
                    center={[0,0,0]}
                    rotation={[lightRotateY, lightRotateX,0]}
                >
                    <Lights text={text}/>
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
                    <TextModel text={text}/>
                </motion.group>

            </MotionConfig>

        </Canvas>
    )

}
function TextModel({text}){
    if(text=="다음 장"){
        return (
            <motion.mesh
                position={[-2, -3.5, 2]}
                rotation={[-1, -1.5, 0.3]}
                variants={{
                    hover:{
                        x:0.2,
                        y:0,
                        z:-1,
                        rotateX: 1.2,
                        rotateY: 0,
                        rotateZ: -0.3
                    }
                }}
            >
            {/* [scale, fillet] */}
            <Suspense fallback={null}>
                    <DirectionArrow scale={1}/>
            </Suspense>
        </motion.mesh>
        )
    }
    else if(text=="이전 장"){
        return (
            <motion.mesh
                position={[-2, -3.5, 2]}
                rotation={[-1, -1.5, 0.3]}
                variants={{
                    hover:{
                        x:0.2,
                        y:0,
                        z:-1,
                        rotateX: 1.2,
                        rotateY: 3.14,
                        rotateZ: -0.3
                    }
                }}
            >
                {/* [scale, fillet] */}
                <Suspense fallback={null}>
                    <DirectionArrow scale={1}/>
                </Suspense>
            </motion.mesh>
        )
    }
    else if(text=="주문서 보기"){
        return (
            <motion.mesh
                position={[0, -4, 6]}
                rotation={[0.5, -1.5, 0.3]}
                variants={{
                    hover:{
                        x:0.2,
                        y:0,
                        z:0,
                        rotateX: 1.2,
                        rotateY: -3.14/2,
                        rotateZ: 0
                    }
                }}
            >
                {/* [scale, fillet] */}
                <Suspense fallback={null}>
                    <TableFolder scale={0.1}/>
                </Suspense>
            </motion.mesh>
        )
    }
}

function Lights({text}){
    if(text=="다음 장"||text=="이전 장"){
        return(
            <>
                <spotLight color="#82ff88" position={[10, 10, 10]} intensity={0.2} />
                <spotLight color="#82ff88" position={[10, 0, -15]} intensity={0.8} />
                <spotLight color="#82ff88" position={[-5, 20, 2]} intensity={0.5} />
                <spotLight color="#3dd5ff" position={[10, 15, 2]} intensity={2} />
                <spotLight color="#3dd5ff" position={[-15, -10, 2]} intensity={1} />
            </>
        )
    }
    else if(text=="주문서 보기"){
        return (
            <>
                <spotLight color="#cff5ab" position={[10, 10, 10]} intensity={0.2} />
                <spotLight color="#cff5ab" position={[10, 0, -15]} intensity={0.8} />
                <spotLight color="#cff5ab" position={[-5, 20, 2]} intensity={0.5} />
                <spotLight color="#b2ff69" position={[10, 15, 2]} intensity={1.5} />
                <spotLight color="#fff947" position={[-15, -10, 2]} intensity={1.5} />
            </>
        )
        
    }
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