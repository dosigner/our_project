const transition = {
    type:"spring",
    duration: 0.7,
    bounce: 0.2
};

const scale_state = {
    rest:{
        scale:1
    },
    hover:{
        scale:1.3
    },
    press:{
        scale:1.8
    }
}

export {transition, scale_state};