import {useEffect, useState} from "react";

export default function useMousePosition(){
    const [mousePosition, setMousePosition] = useState({ x: null, y: null });

    useEffect(() => {
        // Mouse move Handler function
        const mouseMoveHandler = (event) => {
            // event에서 clientX, clientY 값 분리하기
            const { clientX, clientY } = event;
            setMousePosition({ x: clientX, y: clientY });
        };
        // 초기에 mousemove 실행하도록
        document.addEventListener("mousemove", mouseMoveHandler);
        
        // useEffect는 결국 함수를 return 하도록
        return () => {
            document.removeEventListener("mousemove", mouseMoveHandler);
        };
    }, []);
    // 좌표값 return 하는 함수
    return mousePosition;
}