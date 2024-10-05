/* eslint-disable react-refresh/only-export-components */
import { useState, useReducer } from "react";
import { db } from '../firebase/config';
import { doc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";

const initialState = {
    loading: null,
    error: null
}

const UpdateReducer = (state, action) => {
    switch(action.type) {
        case 'LOADING':
            return {loading: true, error: null};
        case 'UPDATED_DOC':
            return {loading: false, error: null};
        case 'ERROR':
            return {loading: false, error: action.payload};
        default:
            return state;
    }

}

export const useUpdateDocument = (docCollection) => {
    const [response, dispatch] = useReducer(UpdateReducer, initialState);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const chekCancelBeforeDispatch = (action) => {
        if(!cancelled){
            dispatch(action);
            return ()=> setCancelled(true);
        }
    };

    const updateDocument = async(uid, data) =>{
        chekCancelBeforeDispatch({
            type:'LOADING'
        });

        try {
            const docRef = await doc(db, docCollection, uid);

            const updateDocument = await updateDoc(docRef, data);
           
            chekCancelBeforeDispatch({
                type:'UPDATED_DOC',
                payload: updateDocument,
            });
           
        } catch (error) {
            chekCancelBeforeDispatch({
                type:'ERROR',
                payload: error.message,
            });            
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []); 
 

    return { updateDocument, response };
}