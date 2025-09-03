import { type FC } from "react";
import CodeBlock from "./shared/CodeBlock";

// Interface example
interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    roles: string[];
    created: Date;
    settings?: UserSettings; // Optional property
    readonly apiKey: string; // Read-only property
}

// Nested interface
interface UserSettings {
    theme: "light" | "dark";
    notifications: boolean;
    language: string;
}

// Type alias example
type UserID = number | string;

// Extending interfaces
interface Employee extends User {
    department: string;
    salary: number;
    hireDate: Date;
}

// Intersection types
type AdminUser = User & {
    adminLevel: number;
    canDeleteUsers: boolean;
};

// Using interfaces to define function types
interface MathFunction {
    (x: number, y: number): number;
}

// Using type aliases for function types
type StringProcessor = (input: string) => string;

const InterfacesAndTypes: FC = () => {
    // Example user objects
    const user: User = {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        isActive: true,
        roles: ["user"],
        created: new Date(),
        apiKey: "abc-123-xyz",
    };

    const employee: Employee = {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        isActive: true,
        roles: ["employee", "manager"],
        created: new Date(),
        apiKey: "emp-456-qrs",
        department: "Engineering",
        salary: 85000,
        hireDate: new Date("2021-06-15"),
    };

    const admin: AdminUser = {
        id: 3,
        name: "Admin User",
        email: "admin@example.com",
        isActive: true,
        roles: ["admin"],
        created: new Date(),
        apiKey: "adm-789-tuv",
        adminLevel: 2,
        canDeleteUsers: true,
    };

    // Function type examples
    const add: MathFunction = (x, y) => x + y;
    const multiply: MathFunction = (x, y) => x * y;

    const toUpperCase: StringProcessor = (input) => input.toUpperCase();
    const toLowerCase: StringProcessor = (input) => input.toLowerCase();

    return (
        <div className="concept-section">
            <h2>Interfaces and Types in TypeScript</h2>
            <p>
                Interfaces and type aliases are powerful TypeScript features
                that help define the shape of objects and create custom types.
            </p>

            <h3>Interfaces</h3>
            <p>
                Interfaces define the structure that objects must conform to.
                They're primarily used for object shapes.
            </p>
            <CodeBlock>
                {`interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  roles: string[];
  created: Date;
  settings?: UserSettings; // Optional property
  readonly apiKey: string; // Read-only property
}

// Nested interface
interface UserSettings {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
}`}
            </CodeBlock>

            <h3>Using Interfaces</h3>
            <CodeBlock>
                {`// Example user object
const user: User = {
  id: ${user.id},
  name: '${user.name}',
  email: '${user.email}',
  isActive: ${user.isActive},
  roles: ${JSON.stringify(user.roles)},
  created: new Date(),
  apiKey: '${user.apiKey}'
};`}
            </CodeBlock>

            <h3>Extending Interfaces</h3>
            <p>
                Interfaces can extend other interfaces to inherit their
                properties.
            </p>
            <CodeBlock>
                {`interface Employee extends User {
  department: string;
  salary: number;
  hireDate: Date;
}`}
            </CodeBlock>
            <CodeBlock>
                {`// Example employee object
const employee: Employee = {
  id: ${employee.id},
  name: '${employee.name}',
  email: '${employee.email}',
  isActive: ${employee.isActive},
  roles: ${JSON.stringify(employee.roles)},
  created: new Date(),
  apiKey: '${employee.apiKey}',
  department: '${employee.department}',
  salary: ${employee.salary},
  hireDate: new Date('2021-06-15')
};`}
            </CodeBlock>

            <h3>Type Aliases</h3>
            <p>
                Type aliases create new names for types. They can name
                primitives, unions, tuples, and any other types.
            </p>
            <CodeBlock>
                {`// Simple type alias
type UserID = number | string;

// Intersection types
type AdminUser = User & {
  adminLevel: number;
  canDeleteUsers: boolean;
};`}
            </CodeBlock>
            <CodeBlock>
                {`// Example admin user
const admin: AdminUser = {
  id: ${admin.id},
  name: '${admin.name}',
  email: '${admin.email}',
  isActive: ${admin.isActive},
  roles: ${JSON.stringify(admin.roles)},
  created: new Date(),
  apiKey: '${admin.apiKey}',
  adminLevel: ${admin.adminLevel},
  canDeleteUsers: ${admin.canDeleteUsers}
};`}
            </CodeBlock>

            <h3>Function Types</h3>
            <p>
                Both interfaces and type aliases can be used to define function
                types.
            </p>
            <CodeBlock>
                {`// Using interfaces for function types
interface MathFunction {
  (x: number, y: number): number;
}

// Using type aliases for function types
type StringProcessor = (input: string) => string;

// Example implementations
const add: MathFunction = (x, y) => x + y;
const multiply: MathFunction = (x, y) => x * y;

const toUpperCase: StringProcessor = (input) => input.toUpperCase();
const toLowerCase: StringProcessor = (input) => input.toLowerCase();`}
            </CodeBlock>

            <div className="info-box">
                <h4>Interfaces vs Type Aliases</h4>
                <ul>
                    <li>
                        <strong>Interfaces</strong> can be extended and are
                        better for defining object shapes
                    </li>
                    <li>
                        <strong>Type aliases</strong> are more flexible and can
                        represent any type, not just objects
                    </li>
                    <li>
                        Interfaces can be merged via declaration merging, types
                        cannot
                    </li>
                    <li>
                        For components props, both can be used, but interfaces
                        are often preferred
                    </li>
                    <li>
                        Use interfaces for public APIs, and types for complex
                        type definitions
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default InterfacesAndTypes;
