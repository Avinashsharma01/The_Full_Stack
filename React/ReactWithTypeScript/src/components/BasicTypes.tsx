import type { FC } from "react";
import CodeBlock from "./shared/CodeBlock";

const BasicTypes: FC = () => {
    // Basic type examples
    const stringExample: string = "Hello TypeScript";
    const numberExample: number = 42;
    const booleanExample: boolean = true;
    // Note: These are for demonstration purposes
    // const undefinedExample: undefined = undefined;
    // const nullExample: null = null;

    // Array types
    const stringArray: string[] = ["React", "TypeScript", "Vite"];
    const numberArray: Array<number> = [1, 2, 3, 4, 5]; // Generic array type

    // Tuple type
    const tuple: [string, number, boolean] = ["TypeScript", 100, true];

    // Const enum alternative (object literal)
    const Direction = {
        Up: "UP",
        Down: "DOWN",
        Left: "LEFT",
        Right: "RIGHT",
    } as const;

    // Type from const object using typeof and keyof
    type Direction = (typeof Direction)[keyof typeof Direction];
    const currentDirection: Direction = Direction.Up;

    // Any type - try to avoid when possible
    // const anyExample: any = "This could be anything";

    // Union type
    const unionExample: string | number = "This can be string or number";

    // Literal type
    type Theme = "light" | "dark";
    const currentTheme: Theme = "dark";

    // Object type
    const objectExample: { name: string; age: number } = {
        name: "John",
        age: 30,
    };

    // Function type with return type annotation
    // const add = (a: number, b: number): number => a + b;

    // Void return type
    // const logMessage = (message: string): void => {
    //     console.log(message);
    // };

    return (
        <div className="concept-section">
            <h2>Basic Types in TypeScript</h2>
            <p>
                TypeScript provides several built-in types that allow you to
                specify what kind of data your variables, parameters, and return
                values can hold.
            </p>

            <h3>Primitive Types</h3>
            <CodeBlock>
                {`// String
const stringExample: string = '${stringExample}';

// Number
const numberExample: number = ${numberExample};

// Boolean
const booleanExample: boolean = ${booleanExample};

// Undefined
const undefinedExample: undefined = undefined;

// Null
const nullExample: null = null;`}
            </CodeBlock>

            <h3>Array Types</h3>
            <CodeBlock>
                {`// Array of strings
const stringArray: string[] = ${JSON.stringify(stringArray)};

// Generic array notation
const numberArray: Array<number> = ${JSON.stringify(numberArray)};`}
            </CodeBlock>

            <h3>Tuple Type</h3>
            <p>
                A tuple is an array with a fixed number of elements with
                specific types.
            </p>
            <CodeBlock>
                {`// Tuple with string, number, boolean
const tuple: [string, number, boolean] = ${JSON.stringify(tuple)};`}
            </CodeBlock>

            <h3>Enum Alternative (const object)</h3>
            <CodeBlock>
                {`// Using const assertion
const Direction = {
  Up: 'UP',
  Down: 'DOWN',
  Left: 'LEFT',
  Right: 'RIGHT'
} as const;

// Type from const object
type Direction = typeof Direction[keyof typeof Direction];
const currentDirection: Direction = Direction.Up; // Value: "${currentDirection}"`}
            </CodeBlock>

            <h3>Union Type</h3>
            <CodeBlock>
                {`// Can be either string or number
const unionExample: string | number = '${unionExample}';`}
            </CodeBlock>

            <h3>Literal Type</h3>
            <CodeBlock>
                {`// Only allows specific values
type Theme = 'light' | 'dark';
const currentTheme: Theme = '${currentTheme}';`}
            </CodeBlock>

            <h3>Object Type</h3>
            <CodeBlock>
                {`const objectExample: { name: string; age: number } = {
  name: '${objectExample.name}',
  age: ${objectExample.age}
};`}
            </CodeBlock>

            <h3>Function Types</h3>
            <CodeBlock>
                {`// Function with return type annotation
const add = (a: number, b: number): number => a + b;

// Void return type (doesn't return a value)
const logMessage = (message: string): void => {
  console.log(message);
};`}
            </CodeBlock>

            <div className="info-box">
                <h4>Best Practices</h4>
                <ul>
                    <li>
                        Avoid using <code>any</code> type whenever possible
                    </li>
                    <li>
                        Use union types instead of <code>any</code> when a
                        variable could have multiple types
                    </li>
                    <li>
                        Use type annotations for function parameters and return
                        types
                    </li>
                    <li>
                        Consider using literal types for values with a fixed set
                        of possible values
                    </li>
                    <li>
                        Prefer <code>as const</code> objects over traditional
                        enums when using TypeScript with{" "}
                        <code>erasableSyntaxOnly</code> enabled
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default BasicTypes;
