import '../../style/newApp.css';

import {motion, AnimatePresence} from "framer-motion";
import { useEffect, useState } from 'react';
import {Canvas, useThree} from "@react-three/fiber"
import { useNavigate } from 'react-router-dom';

// database에 읽을 거 가져오기
import {database} from "../../firebase";


// axios
import axios from "axios";

import Weather from '../../components/Weather';

function AnsWeather() {        
    let navigate = useNavigate();
    const [weatherInfo, setWeatherInfo] = useState();
    useEffect(()=>{
        setTimeout(
          ()=>{navigate("/order");}
        , 6000);
        },[]
    )
    if(weatherInfo?.temperature!=undefined && weatherInfo?.main!=undefined){
        const nameRef = database.ref("/place/tables/table1");
        nameRef.update({
            ["temp"] : weatherInfo.temperature,
            ["weather"]:weatherInfo.main
        });
    }
    
    return (
        <motion.div className="talk"
            key="people"
            initial={false}
            exit={{opacity:0, x:-100, 
                transition:{
                    duration:1
                }
            }}
        >
            <motion.div className="question"
                initial={{ opacity: 0, y:100 }}
                animate={{ opacity: 1, y:0 }}
                transition={{ duration: 1, delay:0.5}}
            >{`${weatherInfo?.temperature}°C, ${tempToString(weatherInfo?.temperature)}`}
            </motion.div>

            <motion.div className="inform"
                initial={{ opacity: 0, y:0 }}
                animate={{ opacity: 1, y:100, transition:{
                        duration: 2,
                        delay:0.5
                    } 
                }}
            >
                <Weather setParent={setWeatherInfo}/>
            </motion.div>
        </motion.div>
    )
}
export const msg = [
    "잠시 일에 벗어나 힐링시간이 되시길~",
    "근처에서 회사를 다니시군요!",
    `피로가 풀릴 수 있도록 좋은 서비스 대접할게요!!`,
];

function tempToString(temp){
    if(temp<4){
        return "완전 겨울날씨에요"
    }
    else if(4<temp<=8){
        return "곧 겨울 날씨에요"
    }
    else if(8<temp && temp <11){
        return "요즘 감기 조심하세요"
    }
    else if(11<=temp && temp <16){
        return "날씨가 점점 쌀쌀해지고 있어요"
    }
    else if(16<=temp && temp <19){
        return "선선하니 딱 좋은 것 같아요"
    }
    else if(19<=temp && temp <22){
        return "봄이 오나봐요"
    }
    else if(22<=temp && temp <26){
        return "이제 점점 더워지네요..."
    }
    else if(26<=temp){
        return "오늘부터 이제 여름이네요"
    }
    else {
        return "기온 표시 오류"
    }
}




export default AnsWeather;