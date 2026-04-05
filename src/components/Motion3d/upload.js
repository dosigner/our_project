import {database} from "../../firebase";

export function upload(path, str){
    let data;
    let key;
    if(path==='/com-newbie'){
        key="newbie"
        data=true;
    }
    else if(path==='/com-regular'){
        key="newbie"
        data=false;
    }

    else if(path==='/com-couple'){
        key="love"
        data=true;
    }
    else if(path==='/com-friend'){
        key="love"
        data=false;
    }
    else if(path==='/com-local'){
        key="type"
        data="local";
    }
    else if(path==='/com-work'){
        key="type"
        data="work";
    }
    else if(path==='/com-trip'){
        key="type"
        data="trip";
    }
    const nameRef = database.ref("/place/tables/table1");
    nameRef.update({
        [key] : data
    });
}