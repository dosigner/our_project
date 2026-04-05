export const list = {
    visible: { 
        opacity: 0.8,
        transition:{
            when:"beforeChildren",
            staggerChildren: 0.35,
            delay:2,
        }
    },
    hidden: { 
        opacity: 0,
    },
    hover:{
        scale:1
    },
    tap:{
        scale:1
    }
}
  
export const item = {   
    visible: { opacity: 0.5, y:0 },
    hidden: { opacity: 0, y:100 },
    hover: {scale: 1.1, opacity:0.4},
    tap: {scale:0.8,opacity:1}
}