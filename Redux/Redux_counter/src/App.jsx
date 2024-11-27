import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./Redux/counter/counterSlice";

import Test from "./Component/Test";
function App() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
    return (
        <>
            <button onClick={() => dispatch(decrement())}>-</button>
            <h1>This is the counter value {count}</h1>
            <button onClick={() => dispatch(increment())}>+</button>

           <br /> <Test />
        </>
    );
}

export default App;
