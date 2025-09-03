import {
    type FC,
    type ReactNode,
    type ReactElement,
    type PropsWithChildren,
} from "react";
import CodeBlock from "./shared/CodeBlock";

// Different ways to type React Function Components

// 1. Basic FC type with props interface
interface GreetingProps {
    name: string;
}

const Greeting: FC<GreetingProps> = ({ name }) => {
    return <p>Hello, {name}!</p>;
};

// 2. React.VFC (for components without children - deprecated in React 18)
// Now it's recommended to use FC and explicitly define children if needed

// 3. Explicit return type with React.ReactElement
interface CounterDisplayProps {
    count: number;
}

const CounterDisplay = ({ count }: CounterDisplayProps): ReactElement => {
    return <div>Current count: {count}</div>;
};

// 4. Using PropsWithChildren for components that accept children
type CardProps = PropsWithChildren<{
    title: string;
    className?: string;
}>;

const Card = ({ title, children, className = "" }: CardProps): ReactElement => {
    return (
        <div className={`card ${className}`}>
            <div className="card-header">{title}</div>
            <div className="card-body">{children}</div>
        </div>
    );
};

// 5. Using specific children type
interface ListProps {
    items: string[];
    renderItem: (item: string) => ReactNode;
}

const List = ({ items, renderItem }: ListProps): ReactElement => {
    return (
        <ul>
            {items.map((item, index) => (
                <li key={index}>{renderItem(item)}</li>
            ))}
        </ul>
    );
};

// 6. Component with generic props
// Generic component props (for demo purposes)
// interface SelectProps<T> {
//     items: T[];
//     selectedItem: T;
//     renderItem: (item: T) => ReactNode;
//     onChange: (item: T) => void;
// }

// Generic component example (commented for demo purposes)
// function Select<T>({
//     items,
//     selectedItem,
//     renderItem,
//     onChange,
// }: SelectProps<T>): ReactElement {
//     return (
//         <div className="select">
//             {items.map((item, index) => (
//                 <div
//                     key={index}
//                     className={item === selectedItem ? "selected" : ""}
//                     onClick={() => onChange(item)}
//                 >
//                     {renderItem(item)}
//                 </div>
//             ))}
//         </div>
//     );
// }

const FunctionComponents: FC = () => {
    const fruits = ["Apple", "Banana", "Cherry", "Durian"];

    return (
        <div className="concept-section">
            <h2>Function Components in TypeScript</h2>
            <p>
                TypeScript provides several ways to type React function
                components. Here are the most common patterns:
            </p>

            <h3>Basic FC type with Props Interface</h3>
            <CodeBlock>
                {`import { type FC } from 'react';

interface GreetingProps {
  name: string;
}

const Greeting: FC<GreetingProps> = ({ name }) => {
  return <p>Hello, {name}!</p>;
};`}
            </CodeBlock>

            <div>
                <h4>Example:</h4>
                <Greeting name="TypeScript Developer" />
            </div>

            <h3>Explicit Return Type</h3>
            <CodeBlock>
                {`interface CounterDisplayProps {
  count: number;
}

const CounterDisplay = ({ count }: CounterDisplayProps): ReactElement => {
  return <div>Current count: {count}</div>;
};`}
            </CodeBlock>

            <div>
                <h4>Example:</h4>
                <CounterDisplay count={42} />
            </div>

            <h3>Components with Children</h3>
            <CodeBlock>
                {`type CardProps = PropsWithChildren<{
  title: string;
  className?: string;
}>;

const Card = ({ title, children, className = '' }: CardProps): ReactElement => {
  return (
    <div className={\`card \${className}\`}>
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
    </div>
  );
};`}
            </CodeBlock>

            <div>
                <h4>Example:</h4>
                <Card title="TypeScript Tips">
                    <p>Use TypeScript with React for better type safety.</p>
                </Card>
            </div>

            <h3>Component with Render Props</h3>
            <CodeBlock>
                {`interface ListProps {
  items: string[];
  renderItem: (item: string) => ReactNode;
}

const List = ({ items, renderItem }: ListProps): ReactElement => {
  return <ul>{items.map((item, index) => <li key={index}>{renderItem(item)}</li>)}</ul>;
};`}
            </CodeBlock>

            <div>
                <h4>Example:</h4>
                <List
                    items={fruits}
                    renderItem={(item) => (
                        <span style={{ fontWeight: "bold" }}>{item}</span>
                    )}
                />
            </div>

            <h3>Generic Components</h3>
            <CodeBlock>
                {`interface SelectProps<T> {
  items: T[];
  selectedItem: T;
  renderItem: (item: T) => ReactNode;
  onChange: (item: T) => void;
}

function Select<T>({ 
  items, 
  selectedItem, 
  renderItem, 
  onChange 
}: SelectProps<T>): ReactElement {
  return (
    <div className="select">
      {items.map((item, index) => (
        <div 
          key={index} 
          className={item === selectedItem ? 'selected' : ''}
          onClick={() => onChange(item)}
        >
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}`}
            </CodeBlock>

            <div className="info-box">
                <h4>Best Practices for Function Components</h4>
                <ul>
                    <li>Use interfaces or type aliases for props</li>
                    <li>
                        Consider making non-required props optional with{" "}
                        <code>?</code>
                    </li>
                    <li>
                        Use PropsWithChildren for components that accept
                        children
                    </li>
                    <li>
                        Use generics for reusable components that work with
                        different data types
                    </li>
                    <li>Explicitly type event handlers and callbacks</li>
                </ul>
            </div>
        </div>
    );
};

export default FunctionComponents;
