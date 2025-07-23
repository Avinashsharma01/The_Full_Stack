import React, { useReducer } from "react";

interface State {
    count: number;
    text: string;
}

interface Action {
    type: "INCREMENT" | "DECREMENT" | "RESET" | "SET_TEXT";
    payload?: string;
}

const initialState: State = {
    count: 0,
    text: "",
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "INCREMENT":
            return { ...state, count: state.count + 1 };
        case "DECREMENT":
            return { ...state, count: state.count - 1 };
        case "RESET":
            return { ...state, count: 0 };
        case "SET_TEXT":
            return { ...state, text: action.payload || "" };
        default:
            throw new Error("Unknown action type");
    }
};

const ComplexCounter: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: "INCREMENT" })}>
                Increment
            </button>
            <button onClick={() => dispatch({ type: "DECREMENT" })}>
                Decrement
            </button>
            <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
            <input
                type="text"
                value={state.text}
                onChange={(e) =>
                    dispatch({ type: "SET_TEXT", payload: e.target.value })
                }
                className="bg-white"
            />
            <p>Text: {state.text}</p>
        </div>
    );
};

export default ComplexCounter;
