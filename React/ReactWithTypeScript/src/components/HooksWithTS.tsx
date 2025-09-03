import {
    type FC,
    useState,
    useEffect,
    useRef,
    useReducer,
    useCallback,
    useMemo,
} from "react";
import CodeBlock from "./shared/CodeBlock";

const HooksWithTS: FC = () => {
    // 1. useState with TypeScript
    // Simple state - TypeScript infers the type
    const [count, setCount] = useState(0);

    // Explicit type annotation
    const [name, setName] = useState<string>("");

    // Union type for state that can be multiple types
    const [data, setData] = useState<string | null>(null);

    // Complex object state
    interface User {
        id: number;
        name: string;
        email: string;
    }

    const [user, setUser] = useState<User | null>(null);

    // 2. useEffect with TypeScript
    useEffect(() => {
        // Effect runs on mount
        console.log("Component mounted");

        // Return cleanup function
        return () => {
            console.log("Component unmounted");
        };
    }, []); // Empty dependency array

    useEffect(() => {
        // This effect depends on count
        // document.title = `Count: ${count}`;
    }, [count]); // TypeScript ensures dependencies are correctly listed

    // 3. useRef with TypeScript
    // For DOM elements
    const inputRef = useRef<HTMLInputElement>(null);

    // For mutable values that persist across renders
    const prevCountRef = useRef<number>(0);

    useEffect(() => {
        prevCountRef.current = count;
    }, [count]);

    // Focus the input on mount
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // 4. useReducer with TypeScript
    interface CounterState {
        count: number;
        lastAction: string;
    }

    type CounterAction =
        | { type: "increment"; payload: number }
        | { type: "decrement"; payload: number }
        | { type: "reset" };

    const initialState: CounterState = {
        count: 0,
        lastAction: "none",
    };

    const counterReducer = (
        state: CounterState,
        action: CounterAction
    ): CounterState => {
        switch (action.type) {
            case "increment":
                return {
                    ...state,
                    count: state.count + action.payload,
                    lastAction: "increment",
                };
            case "decrement":
                return {
                    ...state,
                    count: state.count - action.payload,
                    lastAction: "decrement",
                };
            case "reset":
                return {
                    ...state,
                    count: 0,
                    lastAction: "reset",
                };
            default:
                return state;
        }
    };

    const [counterState, dispatch] = useReducer(counterReducer, initialState);

    // 5. useCallback with TypeScript
    const handleIncrement = useCallback((amount: number) => {
        dispatch({ type: "increment", payload: amount });
    }, []);

    const handleDecrement = useCallback((amount: number) => {
        dispatch({ type: "decrement", payload: amount });
    }, []);

    // 6. useMemo with TypeScript
    interface Item {
        id: number;
        name: string;
    }

    const items: Item[] = [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" },
    ];

    const [filter, setFilter] = useState<string>("");

    const filteredItems = useMemo(() => {
        return items.filter((item) =>
            item.name.toLowerCase().includes(filter.toLowerCase())
        );
    }, [filter, items]);

    return (
        <div className="concept-section">
            <h2>React Hooks with TypeScript</h2>
            <p>
                TypeScript enhances React Hooks by providing better type safety
                and IDE support. Let's explore how to use common hooks with
                TypeScript.
            </p>

            <h3>1. useState with TypeScript</h3>
            <CodeBlock>
                {`// Simple state with type inference
const [count, setCount] = useState(0);

// Explicit type annotation
const [name, setName] = useState<string>('');

// Union type for state that can be multiple types
const [data, setData] = useState<string | null>(null);

// Complex object state
interface User {
  id: number;
  name: string;
  email: string;
}

const [user, setUser] = useState<User | null>(null);`}
            </CodeBlock>

            <div className="example-box">
                <h4>useState Example:</h4>
                <p>Count: {count}</p>
                <button onClick={() => setCount(count + 1)}>Increment</button>
                <button onClick={() => setCount(count - 1)}>Decrement</button>
                <div>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        ref={inputRef}
                    />
                </div>
            </div>

            <h3>2. useEffect with TypeScript</h3>
            <CodeBlock>
                {`useEffect(() => {
  // Effect runs on mount
  console.log('Component mounted');
  
  // Return cleanup function
  return () => {
    console.log('Component unmounted');
  };
}, []); // Empty dependency array

useEffect(() => {
  // This effect depends on count
  document.title = \`Count: \${count}\`;
}, [count]); // TypeScript ensures dependencies are correctly listed`}
            </CodeBlock>

            <h3>3. useRef with TypeScript</h3>
            <CodeBlock>
                {`// For DOM elements
const inputRef = useRef<HTMLInputElement>(null);

// For mutable values that persist across renders
const prevCountRef = useRef<number>(0);

useEffect(() => {
  prevCountRef.current = count;
}, [count]);

// Focus the input on mount
useEffect(() => {
  if (inputRef.current) {
    inputRef.current.focus();
  }
}, []);`}
            </CodeBlock>

            <div className="example-box">
                <h4>useRef Example:</h4>
                <p>Current count: {count}</p>
                <p>Previous count: {prevCountRef.current}</p>
            </div>

            <h3>4. useReducer with TypeScript</h3>
            <CodeBlock>
                {`interface CounterState {
  count: number;
  lastAction: string;
}

type CounterAction = 
  | { type: 'increment'; payload: number }
  | { type: 'decrement'; payload: number }
  | { type: 'reset' };

const initialState: CounterState = {
  count: 0,
  lastAction: 'none'
};

const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        count: state.count + action.payload,
        lastAction: 'increment'
      };
    case 'decrement':
      return {
        ...state,
        count: state.count - action.payload,
        lastAction: 'decrement'
      };
    case 'reset':
      return {
        ...state,
        count: 0,
        lastAction: 'reset'
      };
    default:
      return state;
  }
};

const [counterState, dispatch] = useReducer(counterReducer, initialState);`}
            </CodeBlock>

            <div className="example-box">
                <h4>useReducer Example:</h4>
                <p>Count: {counterState.count}</p>
                <p>Last action: {counterState.lastAction}</p>
                <button onClick={() => handleIncrement(1)}>Increment</button>
                <button onClick={() => handleDecrement(1)}>Decrement</button>
                <button onClick={() => dispatch({ type: "reset" })}>
                    Reset
                </button>
            </div>

            <h3>5. useCallback with TypeScript</h3>
            <CodeBlock>
                {`const handleIncrement = useCallback((amount: number) => {
  dispatch({ type: 'increment', payload: amount });
}, []);

const handleDecrement = useCallback((amount: number) => {
  dispatch({ type: 'decrement', payload: amount });
}, []);`}
            </CodeBlock>

            <h3>6. useMemo with TypeScript</h3>
            <CodeBlock>
                {`interface Item {
  id: number;
  name: string;
}

const items: Item[] = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

const [filter, setFilter] = useState<string>('');

const filteredItems = useMemo(() => {
  return items.filter(item => 
    item.name.toLowerCase().includes(filter.toLowerCase())
  );
}, [filter, items]);`}
            </CodeBlock>

            <div className="example-box">
                <h4>useMemo Example:</h4>
                <input
                    type="text"
                    placeholder="Filter items"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <ul>
                    {filteredItems.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            </div>

            <div className="info-box">
                <h4>TypeScript with Hooks: Best Practices</h4>
                <ul>
                    <li>Use explicit type annotations for complex state</li>
                    <li>Define interfaces for object state types</li>
                    <li>
                        Use union types for states that can be multiple types
                    </li>
                    <li>
                        Type useRef according to what it references (DOM element
                        or value)
                    </li>
                    <li>
                        Define precise action and state types for useReducer
                    </li>
                    <li>Properly type event parameters in callbacks</li>
                </ul>
            </div>
        </div>
    );
};

export default HooksWithTS;
