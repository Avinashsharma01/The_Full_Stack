/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FC, useState, useEffect, useRef } from "react";
import CodeBlock from "./shared/CodeBlock";

const TypeAssertions: FC = () => {
    // Basic examples of type assertions
    // const userInput = "42";

    // Type assertion example 1: "as" syntax (preferred)
    // const numericValue1 = userInput as unknown as number;

    // Type assertion example 2: angle bracket syntax (not used in TSX files)
    // This syntax won't work in .tsx files due to conflict with JSX
    // const numericValue2 = <number>userInput;

    // Type assertion with objects
    // const someObject = {
    //     name: "John",
    //     age: 30,
    // };

    // Asserting a more specific type
    interface User {
        name: string;
        age: number;
        email: string;
    }

    // This is a potentially unsafe assertion because 'email' is missing
    // const user = someObject as User;

    // Safer approach using type assertion with conditional check
    function assertUser(obj: any): asserts obj is User {
        if (!obj || typeof obj !== "object") {
            throw new Error("Not an object");
        }
        if (typeof obj.name !== "string") {
            throw new Error("name property must be a string");
        }
        if (typeof obj.age !== "number") {
            throw new Error("age property must be a number");
        }
        if (typeof obj.email !== "string") {
            throw new Error("email property must be a string");
        }
    }

    // Function to safely use the assertion
    const processUser = (input: unknown) => {
        try {
            assertUser(input);
            // Now TypeScript knows input is User
            return `User ${input.name} (${input.age}) has email: ${input.email}`;
        } catch (error) {
            if (error instanceof Error) {
                return `Invalid user: ${error.message}`;
            }
            return "Unknown error";
        }
    };

    // Type assertion for DOM elements
    const [elementText, setElementText] = useState<string>("");
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        // buttonRef.current may be null during initial render
        if (buttonRef.current) {
            // We need to assert that buttonRef.current is not null
            const button = buttonRef.current as HTMLButtonElement;
            setElementText(button.textContent || "");
        }
    }, []);

    // Type assertion with event targets
    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     // Using type assertion to access specific properties
    //     const target = event.target as HTMLInputElement;
    //     console.log(target.value);
    // };

    // Type assertion with non-null assertion operator
    // const getNonNullValue = () => {
    //     // TypeScript might think this could be null or undefined
    //     const value: string | null = "Hello World";

    //     // Non-null assertion operator (!) tells TypeScript that value is not null/undefined
    //     const definitelyString: string = value!;

    //     return definitelyString;
    // };

    // Const assertions
    // Without const assertion
    // const colors = ["red", "green", "blue"] as string[];
    // // With const assertion (makes tuple with literal types)
    // const constColors = ["red", "green", "blue"] as const;

    // Type assertion examples for display
    const [inputValue, setInputValue] = useState<string>("");
    const [parsedValue, setParsedValue] = useState<string>("");

    const handleParse = () => {
        try {
            // Parse as JSON and then assert as a known type
            const parsed = JSON.parse(inputValue) as {
                name: string;
                value: number;
            };
            setParsedValue(`Name: ${parsed.name}, Value: ${parsed.value}`);
        } catch (error) {
            setParsedValue("Invalid JSON");
        }
    };

    return (
        <div className="concept-section">
            <h2>Type Assertions in TypeScript</h2>
            <p>
                Type assertions allow you to tell TypeScript that you know more
                about the type of a value than TypeScript can infer on its own.
                They don't perform runtime conversion but are purely a
                compile-time construct.
            </p>

            <h3>1. Basic Type Assertions</h3>
            <CodeBlock>
                {`// Using the "as" syntax (preferred)
const userInput = '42';
const numericValue = userInput as unknown as number;

// Using angle bracket syntax (not used in TSX files)
// const numericValue = <number>userInput;`}
            </CodeBlock>

            <div className="info-box">
                <h4>Important Note</h4>
                <p>
                    Type assertions don't perform any runtime conversion. The
                    value doesn't actually change:
                    <br />
                    <code>{`typeof numericValue1 === 'string' // true, not number!`}</code>
                </p>
            </div>

            <h3>2. Asserting Object Types</h3>
            <CodeBlock>
                {`interface User {
  name: string;
  age: number;
  email: string;
}

const someObject = { 
  name: 'John',
  age: 30
};

// This is a potentially unsafe assertion because 'email' is missing
const user = someObject as User;`}
            </CodeBlock>

            <h3>3. Type Predicates and Type Guards</h3>
            <p>
                A safer approach to type assertions is using type predicates and
                assertion functions.
            </p>
            <CodeBlock>
                {`// Type assertion function
function assertUser(obj: any): asserts obj is User {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Not an object');
  }
  if (typeof obj.name !== 'string') {
    throw new Error('name property must be a string');
  }
  if (typeof obj.age !== 'number') {
    throw new Error('age property must be a number');
  }
  if (typeof obj.email !== 'string') {
    throw new Error('email property must be a string');
  }
}

// Function to safely use the assertion
const processUser = (input: unknown) => {
  try {
    assertUser(input);
    // Now TypeScript knows input is User
    return \`User \${input.name} (\${input.age}) has email: \${input.email}\`;
  } catch (error) {
    return \`Invalid user: \${error.message}\`;
  }
};`}
            </CodeBlock>

            <div className="example-box">
                <h4>Type Assertion Function Example:</h4>
                <p>
                    Valid object:{" "}
                    {processUser({
                        name: "John",
                        age: 30,
                        email: "john@example.com",
                    })}
                </p>
                <p>
                    Invalid object:{" "}
                    {processUser({ name: "Bob", age: "twenty" })}
                </p>
            </div>

            <h3>4. DOM Element Type Assertions</h3>
            <CodeBlock>
                {`const buttonRef = useRef<HTMLButtonElement>(null);

useEffect(() => {
  if (buttonRef.current) {
    // We need to assert that buttonRef.current is not null
    const button = buttonRef.current as HTMLButtonElement;
    setElementText(button.textContent || '');
  }
}, []);`}
            </CodeBlock>

            <button ref={buttonRef} className="demo-button">
                Button with Ref
            </button>
            {elementText && <p>Button text: {elementText}</p>}

            <h3>5. Non-null Assertion Operator (!)</h3>
            <CodeBlock>
                {`const getNonNullValue = () => {
  // TypeScript might think this could be null or undefined
  const value: string | null = 'Hello World';
  
  // Non-null assertion operator (!) tells TypeScript that value is not null/undefined
  const definitelyString: string = value!;
  
  return definitelyString;
};`}
            </CodeBlock>

            <div className="info-box">
                <h4>Warning about Non-null Assertion (!)</h4>
                <p>
                    The non-null assertion operator should be used with caution.
                    It tells TypeScript to ignore the possibility of null or
                    undefined, which could lead to runtime errors if your
                    assumption is incorrect.
                </p>
            </div>

            <h3>6. Const Assertions</h3>
            <CodeBlock>
                {`// Without const assertion
const colors = ['red', 'green', 'blue'] as string[];
// With const assertion (makes tuple with literal types)
const constColors = ['red', 'green', 'blue'] as const;`}
            </CodeBlock>

            <p>
                With <code>as const</code>, the type is{" "}
                <code>readonly ['red', 'green', 'blue']</code> instead of just{" "}
                <code>string[]</code>, preserving the exact values and making
                the array readonly.
            </p>

            <h3>Try It: Type Assertion with JSON Parsing</h3>
            <div className="example-box">
                <p>
                    Enter a JSON object with "name" (string) and "value"
                    (number):
                </p>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder='{"name": "item", "value": 42}'
                />
                <button onClick={handleParse}>Parse</button>
                {parsedValue && <p>Result: {parsedValue}</p>}
            </div>

            <div className="info-box">
                <h4>Best Practices for Type Assertions</h4>
                <ul>
                    <li>
                        Use assertions only when you're certain about the type
                    </li>
                    <li>
                        Prefer type guards and runtime checks over assertions
                        when possible
                    </li>
                    <li>
                        Use <code>unknown</code> as an intermediate type for
                        safer assertions
                    </li>
                    <li>
                        Avoid using <code>as any</code> as it bypasses all type
                        checking
                    </li>
                    <li>
                        Consider writing custom type guard functions for complex
                        types
                    </li>
                    <li>
                        Use <code>as const</code> to preserve literal types and
                        make objects/arrays readonly
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default TypeAssertions;
