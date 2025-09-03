import { type FC } from "react";
import CodeBlock from "./shared/CodeBlock";

const UtilityTypes: FC = () => {
    // Example base types for demonstration
    interface User {
        id: number;
        name: string;
        email: string;
        role: string;
        createdAt: Date;
        settings: UserSettings;
    }

    interface UserSettings {
        theme: "light" | "dark";
        notifications: boolean;
        language: string;
    }

    // 1. Partial<Type>
    // Makes all properties in Type optional
    type PartialUser = Partial<User>;

    // Example usage: function to update user with partial data
    const updateUser = (userId: number, updates: Partial<User>) => {
        // In a real app, you would fetch the user and merge with updates
        console.log(`Updating user ${userId} with:`, updates);
    };

    // 2. Required<Type>
    // Makes all properties in Type required
    type StrictUser = Required<UserSettings>;

    // 3. Readonly<Type>
    // Makes all properties in Type readonly
    type ReadonlyUser = Readonly<User>;

    // 4. Record<Keys, Type>
    // Creates a type with properties of Keys type and values of Type
    type UserRoles = Record<string, string[]>;

    const roles: UserRoles = {
        admin: ["read", "write", "delete"],
        editor: ["read", "write"],
        viewer: ["read"],
    };

    // 5. Pick<Type, Keys>
    // Creates a type by picking specific properties from Type
    type UserProfile = Pick<User, "id" | "name" | "email">;

    // 6. Omit<Type, Keys>
    // Creates a type by omitting specific properties from Type
    type UserWithoutSettings = Omit<User, "settings">;

    // 7. Exclude<Type, ExcludedUnion>
    // Excludes types from a union
    type BasicRole = "admin" | "editor" | "viewer" | "guest";
    type NonAdminRole = Exclude<BasicRole, "admin">;

    // 8. Extract<Type, Union>
    // Extracts types from a union that are assignable to Union
    type AdminOrEditor = Extract<BasicRole, "admin" | "editor">;

    // 9. NonNullable<Type>
    // Creates a type by excluding null and undefined
    type UserOrNull = User | null | undefined;
    type NonNullableUser = NonNullable<UserOrNull>;

    // 10. Parameters<Type>
    // Extracts parameter types of a function type
    type UserHandlerFunction = (user: User, action: string) => void;
    type UserHandlerParams = Parameters<UserHandlerFunction>;

    // 11. ReturnType<Type>
    // Extracts the return type of a function
    function fetchUser(): Promise<User> {
        return Promise.resolve({} as User);
    }

    type FetchUserReturnType = ReturnType<typeof fetchUser>; // Promise<User>

    // 12. InstanceType<Type>
    // Extracts the instance type from a constructor function
    class UserManager {
        getUser(id: number) {
            return {} as User;
        }
    }

    type UserManagerInstance = InstanceType<typeof UserManager>;

    // 13. Awaited<Type>
    // Extracts the resolved type from a Promise
    type FetchedUser = Awaited<ReturnType<typeof fetchUser>>; // User

    return (
        <div className="concept-section">
            <h2>TypeScript Utility Types</h2>
            <p>
                TypeScript provides several utility types that allow you to
                transform existing types for different use cases. These utility
                types are especially useful when working with component props,
                API data, and state management.
            </p>

            <h3>Common Utility Types</h3>

            <h4>1. Partial&lt;Type&gt;</h4>
            <p>
                Creates a type with all properties of Type set to optional.
                Useful for update functions or optional props.
            </p>
            <CodeBlock>
                {`interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// All properties are optional
type PartialUser = Partial<User>;

// Example usage
const updateUser = (userId: number, updates: Partial<User>) => {
  // Only need to provide the fields being updated
  console.log(\`Updating user \${userId} with:\`, updates);
};

// Valid usage - only providing some fields
updateUser(1, { name: 'John Doe' });`}
            </CodeBlock>

            <h4>2. Required&lt;Type&gt;</h4>
            <p>
                Creates a type with all properties of Type set to required
                (removes optionality).
            </p>
            <CodeBlock>
                {`interface UserSettings {
  theme?: 'light' | 'dark';
  notifications?: boolean;
  language?: string;
}

// All properties are required
type StrictUserSettings = Required<UserSettings>;

// Must provide all properties
const settings: StrictUserSettings = {
  theme: 'dark',
  notifications: true,
  language: 'en'
};`}
            </CodeBlock>

            <h4>3. Readonly&lt;Type&gt;</h4>
            <p>
                Creates a type with all properties set to readonly, preventing
                modifications.
            </p>
            <CodeBlock>
                {`// All properties cannot be modified after initialization
type ReadonlyUser = Readonly<User>;

const user: ReadonlyUser = {
  id: 1,
  name: 'Jane Smith',
  email: 'jane@example.com',
  role: 'admin',
  createdAt: new Date(),
  settings: { theme: 'light', notifications: true, language: 'en' }
};

// Error: Cannot assign to 'name' because it is a read-only property
// user.name = 'New Name';`}
            </CodeBlock>

            <h4>4. Record&lt;Keys, Type&gt;</h4>
            <p>
                Creates a type with properties of Keys type and values of Type.
                Great for objects with consistent value types.
            </p>
            <CodeBlock>
                {`type UserRoles = Record<string, string[]>;

const roles: UserRoles = {
  admin: ['read', 'write', 'delete'],
  editor: ['read', 'write'],
  viewer: ['read']
};`}
            </CodeBlock>

            <h4>5. Pick&lt;Type, Keys&gt;</h4>
            <p>
                Creates a type by picking specific properties from Type. Useful
                for creating subsets of existing types.
            </p>
            <CodeBlock>
                {`// Only includes id, name, and email
type UserProfile = Pick<User, 'id' | 'name' | 'email'>;

const profile: UserProfile = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
  // Other User properties are not allowed here
};`}
            </CodeBlock>

            <h4>6. Omit&lt;Type, Keys&gt;</h4>
            <p>
                Creates a type by omitting specific properties from Type. The
                opposite of Pick.
            </p>
            <CodeBlock>
                {`// Excludes the settings property
type UserWithoutSettings = Omit<User, 'settings'>;

const userWithoutSettings: UserWithoutSettings = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  role: 'editor',
  createdAt: new Date()
  // 'settings' property is not allowed here
};`}
            </CodeBlock>

            <h4>7. Exclude&lt;Type, ExcludedUnion&gt;</h4>
            <p>Creates a type by excluding values from a union type.</p>
            <CodeBlock>
                {`type BasicRole = 'admin' | 'editor' | 'viewer' | 'guest';
type NonAdminRole = Exclude<BasicRole, 'admin'>;
// NonAdminRole = 'editor' | 'viewer' | 'guest'`}
            </CodeBlock>

            <h4>8. Extract&lt;Type, Union&gt;</h4>
            <p>
                Creates a type by extracting values from a union type. The
                opposite of Exclude.
            </p>
            <CodeBlock>
                {`type BasicRole = 'admin' | 'editor' | 'viewer' | 'guest';
type AdminOrEditor = Extract<BasicRole, 'admin' | 'editor'>;
// AdminOrEditor = 'admin' | 'editor'`}
            </CodeBlock>

            <h4>9. NonNullable&lt;Type&gt;</h4>
            <p>Creates a type by excluding null and undefined.</p>
            <CodeBlock>
                {`type UserOrNull = User | null | undefined;
type NonNullableUser = NonNullable<UserOrNull>;
// NonNullableUser = User`}
            </CodeBlock>

            <h4>10. Parameters&lt;Type&gt;</h4>
            <p>Extracts parameter types from a function type.</p>
            <CodeBlock>
                {`type UserHandlerFunction = (user: User, action: string) => void;
type UserHandlerParams = Parameters<UserHandlerFunction>;
// UserHandlerParams = [user: User, action: string]`}
            </CodeBlock>

            <h4>11. ReturnType&lt;Type&gt;</h4>
            <p>Extracts the return type of a function.</p>
            <CodeBlock>
                {`function fetchUser(): Promise<User> {
  return Promise.resolve({} as User);
}

type FetchUserReturnType = ReturnType<typeof fetchUser>;
// FetchUserReturnType = Promise<User>`}
            </CodeBlock>

            <h4>12. Awaited&lt;Type&gt;</h4>
            <p>Extracts the resolved type from a Promise.</p>
            <CodeBlock>
                {`type FetchedUser = Awaited<ReturnType<typeof fetchUser>>;
// FetchedUser = User`}
            </CodeBlock>

            <div className="info-box">
                <h4>Real-World Use Cases for Utility Types</h4>
                <ul>
                    <li>
                        <strong>Form Handling:</strong> Use{" "}
                        <code>Partial&lt;T&gt;</code> for form state that's
                        gradually filled
                    </li>
                    <li>
                        <strong>API Responses:</strong> Use{" "}
                        <code>Pick&lt;T, K&gt;</code> to extract only needed
                        fields from API data
                    </li>
                    <li>
                        <strong>Configuration Objects:</strong> Use{" "}
                        <code>Required&lt;T&gt;</code> to ensure all settings
                        are provided
                    </li>
                    <li>
                        <strong>State Management:</strong> Use{" "}
                        <code>Readonly&lt;T&gt;</code> to prevent direct state
                        mutations
                    </li>
                    <li>
                        <strong>Data Mapping:</strong> Use{" "}
                        <code>Record&lt;K, T&gt;</code> for lookup tables and
                        mappings
                    </li>
                    <li>
                        <strong>Typescript Redux:</strong> Utility types are
                        extensively used in typed Redux stores
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UtilityTypes;
