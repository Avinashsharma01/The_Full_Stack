import { type FC, useState, useEffect } from "react";
import CodeBlock from "./shared/CodeBlock";

// Define a type for our component props
interface PropsExampleProps {
    name: string; // Required string prop
    age: number; // Required number prop
    isActive: boolean; // Required boolean prop
    email?: string; // Optional string prop
    roles?: string[]; // Optional array prop
    onNameChange?: (newName: string) => void; // Optional function prop
    children?: React.ReactNode; // Optional children prop
}

// Define props with default values
interface WithDefaultsProps {
    title: string;
    showHeader?: boolean;
    maxItems?: number;
}

// Component with prop destructuring and default values
const WithDefaults: FC<WithDefaultsProps> = ({
    title,
    showHeader = true,
    maxItems = 10,
}) => (
    <div>
        {showHeader && <h3>{title}</h3>}
        <p>Max Items: {maxItems}</p>
    </div>
);

// Component using React.ReactNode for children
interface CardProps {
    title: string;
    children: React.ReactNode;
}

const Card: FC<CardProps> = ({ title, children }) => (
    <div className="card">
        <div className="card-header">{title}</div>
        <div className="card-body">{children}</div>
    </div>
);

// Component with useState typed
const Counter: FC = () => {
    // Type inference works here, but we can be explicit
    const [count, setCount] = useState<number>(0);
    // Other state examples (commented for demo)
    // const [text, setText] = useState<string>("");
    // const [isActive, setIsActive] = useState<boolean>(false);
    // const [items, setItems] = useState<string[]>([]);

    // useState with complex types (commented for demo)
    // interface User {
    //     id: number;
    //     name: string;
    //     email: string;
    // }

    // Explicitly providing the type for useState (commented for demo)
    // const [user, setUser] = useState<User | null>(null);

    // Using a type with optional fields
    interface FormState {
        username: string;
        password: string;
        confirmPassword?: string;
        email?: string;
    }

    const [form, setForm] = useState<FormState>({
        username: "",
        password: "",
    });

    // Update a single field in a complex state
    const updateUsername = (newUsername: string) => {
        setForm({
            ...form,
            username: newUsername,
        });
    };

    // You can use useEffect with typed dependencies
    useEffect(() => {
        // This effect depends on the count state
        document.title = `Count: ${count}`;
    }, [count]); // TypeScript checks that dependencies are correctly listed

    return (
        <div>
            <h3>Counter Example</h3>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>

            <h4>Form Example</h4>
            <input
                type="text"
                value={form.username}
                onChange={(e) => updateUsername(e.target.value)}
                placeholder="Username"
            />
        </div>
    );
};

// Main component that shows prop typing examples
const PropsExample: FC<PropsExampleProps> = (props) => {
    const { name, age, isActive, email, roles = [] } = props;

    const [userName, setUserName] = useState<string>(name);

    const handleNameChange = (newName: string) => {
        setUserName(newName);
        props.onNameChange?.(newName); // Safe call with optional chaining
    };

    return (
        <div className="concept-section">
            <h2>Props and State in TypeScript</h2>
            <p>
                TypeScript helps ensure that components receive the correct
                props and manage their state with proper types.
            </p>

            <h3>Prop Types Example</h3>
            <div className="example-box">
                <h4>User Info</h4>
                <p>Name: {userName}</p>
                <p>Age: {age}</p>
                <p>Status: {isActive ? "Active" : "Inactive"}</p>
                {email && <p>Email: {email}</p>}
                {roles.length > 0 && (
                    <div>
                        <p>Roles:</p>
                        <ul>
                            {roles.map((role, index) => (
                                <li key={index}>{role}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <input
                    type="text"
                    value={userName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Change name"
                />
            </div>

            <h3>Typing Props</h3>
            <CodeBlock>
                {`interface PropsExampleProps {
  name: string;             // Required string prop
  age: number;              // Required number prop
  isActive: boolean;        // Required boolean prop
  email?: string;           // Optional string prop
  roles?: string[];         // Optional array prop
  onNameChange?: (newName: string) => void;  // Optional function prop
  children?: React.ReactNode; // Optional children prop
}`}
            </CodeBlock>

            <h3>Props with Default Values</h3>
            <CodeBlock>
                {`interface WithDefaultsProps {
  title: string;
  showHeader?: boolean;
  maxItems?: number;
}

const WithDefaults: FC<WithDefaultsProps> = ({
  title,
  showHeader = true,
  maxItems = 10
}) => (
  <div>
    {showHeader && <h3>{title}</h3>}
    <p>Max Items: {maxItems}</p>
  </div>
);`}
            </CodeBlock>

            <div>
                <h4>Example:</h4>
                <WithDefaults title="Component With Defaults" />
            </div>

            <h3>State Management with TypeScript</h3>
            <CodeBlock>
                {`// Basic state types
const [count, setCount] = useState<number>(0);
const [text, setText] = useState<string>('');
const [isActive, setIsActive] = useState<boolean>(false);
const [items, setItems] = useState<string[]>([]);

// Complex state types
interface User {
  id: number;
  name: string;
  email: string;
}

const [user, setUser] = useState<User | null>(null);

interface FormState {
  username: string;
  password: string;
  confirmPassword?: string;
}

const [form, setForm] = useState<FormState>({
  username: '',
  password: ''
});

// Updating complex state
const updateUsername = (newUsername: string) => {
  setForm({
    ...form,
    username: newUsername
  });
};`}
            </CodeBlock>

            <Counter />

            <Card title="Children Props Example">
                <p>This content is passed as children to the Card component.</p>
                <p>
                    The Card component types its children prop as
                    React.ReactNode.
                </p>
            </Card>

            <div className="info-box">
                <h4>Best Practices</h4>
                <ul>
                    <li>
                        Always define prop types with interfaces or type aliases
                    </li>
                    <li>
                        Make optional props explicit with the <code>?</code>{" "}
                        operator
                    </li>
                    <li>
                        Use union types for props that can accept multiple types
                    </li>
                    <li>
                        Be explicit with useState generic type when the inferred
                        type is insufficient
                    </li>
                    <li>
                        Use destructuring with default values for optional props
                    </li>
                    <li>
                        Use optional chaining <code>?.</code> when calling
                        optional function props
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default PropsExample;
