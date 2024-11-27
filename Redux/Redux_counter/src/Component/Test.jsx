import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../Redux/counter/counterSlice";

function Test() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    console.log(count);
    return <>
        <button onClick={() => dispatch(decrement())}>-</button>
        <h1>this is comes from the test {count}</h1>
        <button onClick={() => dispatch(increment())}>+</button>
    </>;
}

export default Test;
