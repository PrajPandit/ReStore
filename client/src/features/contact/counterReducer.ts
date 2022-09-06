import { title } from "process";

export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";


export function increment(amount = 1) {
    return {
        type: INCREMENT_COUNTER,
        payload: amount
    }
}

export function decrement(amount = 1) {
    return {
        type: DECREMENT_COUNTER,
        payload: amount
    }
}

export interface CounterState {
    data: number;
    title: string;
}

const initialState : CounterState = {
    data: 42,
    title: "YARC (Yet another reducer counter)"
}

export default function counterReducer(state = initialState, action: any){

    switch (action.type) {
        case INCREMENT_COUNTER:
            return {
                ...state,
                data : state.data + action.payload
            }
            break;
        case DECREMENT_COUNTER:
            return {
                ...state,
                data : state.data - action.payload
            }   
            break;
    
        default:
            return state;
    }

}