import { useReducer } from "react"; // Importing useReducer hook from React

// Define the state interface
interface State {
    count: number; // State has a single property 'count' of type number
}

// Define the action interface
interface Action {
    type: string; // Action has a single property 'type' of type string
}

// Define reducer function
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "INCREMENT":
            return { count: state.count + 1 }; // Increment count by 1
        case "DECREMENT":
            return { count: state.count - 1 }; // Decrement count by 1
        case "RESET":
            return { count: 0 }; // Reset count to 0
        default:
            return state; // Return current state for unknown action types
    }
};

function UseReducerr() {
    // Initialize useReducer with reducer function and initial state
    const [state, dispatch] = useReducer(reducer, { count: 0 });

    return (
        <div>
            <p className="bg-black text-white text-center">
                Count: {state.count} {/* Display the current count */}
            </p>
            <div className="btns mt-5 flex justify-center items-center gap-10 text-white">
                <button
                    onClick={() => dispatch({ type: "INCREMENT" })} // Dispatch INCREMENT action
                    className="bg-green-600 p-2"
                >
                    Increment
                </button>
                <button
                    onClick={() => dispatch({ type: "DECREMENT" })} // Dispatch DECREMENT action
                    className="bg-red-600 p-2"
                >
                    Decrement
                </button>
                <button
                    onClick={() => dispatch({ type: "RESET" })} // Dispatch RESET action
                    className="bg-yellow-600 p-2"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

export default UseReducerr; // Export the component as default
