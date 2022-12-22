import data from '../database/data';
import { postServerData } from '../helper/helper';
import * as Action from '../redux/result_reducer'

export const PushAnswer = (result) => async (dispatch) =>{
    try{
        await dispatch(Action.pushResultAction(result))
    }catch(error){
        console.log(error);
    }
}

export const updateResult = (index) => async (dispatch) => {
    try {
        dispatch(Action.updateResultAction(index));
    }catch(error) {
        console.log(error)
    }
}

// insertar datos del usuario
export const usePublihResult = (resultData) => {
    const { result, username } = resultData;
    (async () => {
        try {
            if(result !== [] && !username) throw new Error("Couldnt get result");
            await postServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`, resultData,data => data)
        }catch (error){
            console.log(error)
        }
    })();
}