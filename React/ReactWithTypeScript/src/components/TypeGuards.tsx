import { type FC, useState } from "react";
import CodeBlock from "./shared/CodeBlock";

const TypeGuards: FC = () => {
    // Example data for demonstrating type guards
    type StringOrNumber = string | number;
    type UserRole = "admin" | "editor" | "viewer";

    interface User {
        id: number;
        name: string;
        role: UserRole;
    }

    interface Admin extends User {
        role: "admin";
        permissions: string[];
    }

    interface Editor extends User {
        role: "editor";
        articles: number;
    }

    interface Viewer extends User {
        role: "viewer";
        lastVisit: Date;
    }

    type AppUser = Admin | Editor | Viewer;

    // 1. typeof type guard
    function processValue(value: StringOrNumber) {
        // typeof type guard
        if (typeof value === "string") {
            return value.toUpperCase(); // TypeScript knows value is string here
        } else {
            return value.toFixed(2); // TypeScript knows value is number here
        }
    }

    // 2. instanceof type guard
    class HttpError extends Error {
        statusCode: number;

        constructor(message: string, statusCode: number) {
            super(message);
            this.statusCode = statusCode;
        }
    }

    class ValidationError extends Error {
        fieldErrors: Record<string, string>;

        constructor(message: string, fieldErrors: Record<string, string>) {
            super(message);
            this.fieldErrors = fieldErrors;
        }
    }

    function handleError(error: Error) {
        // instanceof type guard
        if (error instanceof HttpError) {
            return `HTTP Error ${error.statusCode}: ${error.message}`;
        } else if (error instanceof ValidationError) {
            const fields = Object.keys(error.fieldErrors).join(", ");
            return `Validation Error in fields: ${fields}`;
        } else {
            return `General Error: ${error.message}`;
        }
    }

    // 3. in property type guard
    function getUserDetails(user: AppUser) {
        // Check if property exists in object
        if ("permissions" in user) {
            // TypeScript knows user is Admin here
            return `Admin ${user.name} has permissions: ${user.permissions.join(
                ", "
            )}`;
        } else if ("articles" in user) {
            // TypeScript knows user is Editor here
            return `Editor ${user.name} has written ${user.articles} articles`;
        } else if ("lastVisit" in user) {
            // TypeScript knows user is Viewer here
            return `Viewer ${
                user.name
            } last visited on ${user.lastVisit.toLocaleDateString()}`;
        }

        // This should never happen due to our type definitions
        return `Unknown user type: ${user.name}`;
    }

    // 4. Custom type guard with type predicate
    function isAdmin(user: AppUser): user is Admin {
        return user.role === "admin";
    }

    function isEditor(user: AppUser): user is Editor {
        return user.role === "editor";
    }

    function isViewer(user: AppUser): user is Viewer {
        return user.role === "viewer";
    }

    // Using custom type guard
    function getUserPermissions(user: AppUser): string[] {
        if (isAdmin(user)) {
            // TypeScript knows user is Admin here
            return user.permissions;
        } else {
            // Return default permissions for non-admins
            return ["read"];
        }
    }

    // 5. Using discriminated unions
    // 'role' is the discriminant property
    function getUserInfo(user: AppUser) {
        // Switch on the discriminant
        switch (user.role) {
            case "admin":
                // TypeScript knows user is Admin here
                return `Admin ${user.name} (${user.permissions.join(", ")})`;
            case "editor":
                // TypeScript knows user is Editor here
                return `Editor ${user.name} (${user.articles} articles)`;
            case "viewer":
                // TypeScript knows user is Viewer here
                return `Viewer ${
                    user.name
                } (last visit: ${user.lastVisit.toLocaleDateString()})`;
            default:
                // This should never be reached with a properly typed AppUser
                const _exhaustiveCheck: never = user;
                return _exhaustiveCheck;
        }
    }

    // 6. Assertion functions
    function assertIsAdmin(user: AppUser): asserts user is Admin {
        if (user.role !== "admin") {
            throw new Error(`User ${user.name} is not an admin`);
        }
    }

    function processAdminUser(user: AppUser) {
        try {
            assertIsAdmin(user);
            // TypeScript knows user is Admin here
            return `Admin permissions: ${user.permissions.join(", ")}`;
        } catch (error) {
            if (error instanceof Error) {
                return error.message;
            }
            return "Unknown error";
        }
    }

    // Sample data for examples
    const stringValue: StringOrNumber = "hello";
    const numberValue: StringOrNumber = 42;

    const adminUser: Admin = {
        id: 1,
        name: "Alice",
        role: "admin",
        permissions: ["manage_users", "manage_content"],
    };

    const editorUser: Editor = {
        id: 2,
        name: "Bob",
        role: "editor",
        articles: 15,
    };

    const viewerUser: Viewer = {
        id: 3,
        name: "Charlie",
        role: "viewer",
        lastVisit: new Date(),
    };

    const httpError = new HttpError("Not Found", 404);
    const validationError = new ValidationError("Invalid input", {
        email: "Invalid email format",
        password: "Password too short",
    });

    // Interactive example
    const [selectedUser, setSelectedUser] = useState<AppUser | null>(null);

    return (
        <div className="concept-section">
            <h2>Type Guards in TypeScript</h2>
            <p>
                Type guards allow you to narrow down the type of a variable
                within a conditional block, enabling TypeScript to know more
                specific types in different branches of your code.
            </p>

            <h3>1. typeof Type Guard</h3>
            <p>
                The most basic type guard uses the JavaScript{" "}
                <code>typeof</code> operator to check primitive types.
            </p>
            <CodeBlock>
                {`function processValue(value: string | number) {
  // typeof type guard
  if (typeof value === 'string') {
    return value.toUpperCase(); // TypeScript knows value is string here
  } else {
    return value.toFixed(2); // TypeScript knows value is number here
  }
}`}
            </CodeBlock>

            <div className="example-box">
                <h4>Example Results:</h4>
                <p>Process string "hello": {processValue(stringValue)}</p>
                <p>Process number 42: {processValue(numberValue)}</p>
            </div>

            <h3>2. instanceof Type Guard</h3>
            <p>
                The <code>instanceof</code> operator checks if an object is an
                instance of a class.
            </p>
            <CodeBlock>
                {`class HttpError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

class ValidationError extends Error {
  fieldErrors: Record<string, string>;
  
  constructor(message: string, fieldErrors: Record<string, string>) {
    super(message);
    this.fieldErrors = fieldErrors;
  }
}

function handleError(error: Error) {
  // instanceof type guard
  if (error instanceof HttpError) {
    return \`HTTP Error \${error.statusCode}: \${error.message}\`;
  } else if (error instanceof ValidationError) {
    const fields = Object.keys(error.fieldErrors).join(', ');
    return \`Validation Error in fields: \${fields}\`;
  } else {
    return \`General Error: \${error.message}\`;
  }
}`}
            </CodeBlock>

            <div className="example-box">
                <h4>Example Results:</h4>
                <p>Handle HTTP error: {handleError(httpError)}</p>
                <p>Handle validation error: {handleError(validationError)}</p>
            </div>

            <h3>3. in Property Type Guard</h3>
            <p>
                The <code>in</code> operator checks if a property exists on an
                object.
            </p>
            <CodeBlock>
                {`function getUserDetails(user: Admin | Editor | Viewer) {
  // Check if property exists in object
  if ('permissions' in user) {
    // TypeScript knows user is Admin here
    return \`Admin \${user.name} has permissions: \${user.permissions.join(', ')}\`;
  } else if ('articles' in user) {
    // TypeScript knows user is Editor here
    return \`Editor \${user.name} has written \${user.articles} articles\`;
  } else if ('lastVisit' in user) {
    // TypeScript knows user is Viewer here
    return \`Viewer \${user.name} last visited on \${user.lastVisit.toLocaleDateString()}\`;
  }
}`}
            </CodeBlock>

            <div className="example-box">
                <h4>Example Results:</h4>
                <p>Admin details: {getUserDetails(adminUser)}</p>
                <p>Editor details: {getUserDetails(editorUser)}</p>
                <p>Viewer details: {getUserDetails(viewerUser)}</p>
            </div>

            <h3>4. Custom Type Guards with Type Predicates</h3>
            <p>
                Type predicates use the <code>parameterName is Type</code>{" "}
                syntax to create custom type guards.
            </p>
            <CodeBlock>
                {`function isAdmin(user: AppUser): user is Admin {
  return user.role === 'admin';
}

function isEditor(user: AppUser): user is Editor {
  return user.role === 'editor';
}

function isViewer(user: AppUser): user is Viewer {
  return user.role === 'viewer';
}

// Using custom type guard
function getUserPermissions(user: AppUser): string[] {
  if (isAdmin(user)) {
    // TypeScript knows user is Admin here
    return user.permissions;
  } else {
    // Return default permissions for non-admins
    return ['read'];
  }
}`}
            </CodeBlock>

            <div className="example-box">
                <h4>Example Results:</h4>
                <p>
                    Admin permissions:{" "}
                    {getUserPermissions(adminUser).join(", ")}
                </p>
                <p>
                    Editor permissions:{" "}
                    {getUserPermissions(editorUser).join(", ")}
                </p>
            </div>

            <h3>5. Discriminated Unions</h3>
            <p>
                Discriminated unions use a common property (the "discriminant")
                to narrow down the type.
            </p>
            <CodeBlock>
                {`// 'role' is the discriminant property
function getUserInfo(user: AppUser) {
  // Switch on the discriminant
  switch (user.role) {
    case 'admin':
      // TypeScript knows user is Admin here
      return \`Admin \${user.name} (\${user.permissions.join(', ')})\`;
    case 'editor':
      // TypeScript knows user is Editor here
      return \`Editor \${user.name} (\${user.articles} articles)\`;
    case 'viewer':
      // TypeScript knows user is Viewer here
      return \`Viewer \${user.name} (last visit: \${user.lastVisit.toLocaleDateString()})\`;
    default:
      // This should never be reached with a properly typed AppUser
      const _exhaustiveCheck: never = user;
      return _exhaustiveCheck;
  }
}`}
            </CodeBlock>

            <div className="example-box">
                <h4>Example Results:</h4>
                <p>{getUserInfo(adminUser)}</p>
                <p>{getUserInfo(editorUser)}</p>
                <p>{getUserInfo(viewerUser)}</p>
            </div>

            <h3>6. Assertion Functions</h3>
            <p>
                Assertion functions throw an error if a condition isn't met,
                narrowing the type if the function doesn't throw.
            </p>
            <CodeBlock>
                {`function assertIsAdmin(user: AppUser): asserts user is Admin {
  if (user.role !== 'admin') {
    throw new Error(\`User \${user.name} is not an admin\`);
  }
}

function processAdminUser(user: AppUser) {
  try {
    assertIsAdmin(user);
    // TypeScript knows user is Admin here
    return \`Admin permissions: \${user.permissions.join(', ')}\`;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Unknown error';
  }
}`}
            </CodeBlock>

            <div className="example-box">
                <h4>Example Results:</h4>
                <p>Process admin: {processAdminUser(adminUser)}</p>
                <p>Process editor: {processAdminUser(editorUser)}</p>
            </div>

            <h3>Interactive Example</h3>
            <div className="example-box">
                <h4>Select a user to view details:</h4>
                <button onClick={() => setSelectedUser(adminUser)}>
                    Admin
                </button>
                <button onClick={() => setSelectedUser(editorUser)}>
                    Editor
                </button>
                <button onClick={() => setSelectedUser(viewerUser)}>
                    Viewer
                </button>

                {selectedUser && (
                    <div className="user-details">
                        <h4>User Details:</h4>
                        <p>
                            <strong>Name:</strong> {selectedUser.name}
                        </p>
                        <p>
                            <strong>Role:</strong> {selectedUser.role}
                        </p>

                        {/* Using type guards to show specific properties */}
                        {isAdmin(selectedUser) && (
                            <p>
                                <strong>Permissions:</strong>{" "}
                                {selectedUser.permissions.join(", ")}
                            </p>
                        )}

                        {isEditor(selectedUser) && (
                            <p>
                                <strong>Articles:</strong>{" "}
                                {selectedUser.articles}
                            </p>
                        )}

                        {isViewer(selectedUser) && (
                            <p>
                                <strong>Last Visit:</strong>{" "}
                                {selectedUser.lastVisit.toLocaleDateString()}
                            </p>
                        )}
                    </div>
                )}
            </div>

            <div className="info-box">
                <h4>Best Practices for Type Guards</h4>
                <ul>
                    <li>
                        Use the appropriate type guard for your situation:
                        <ul>
                            <li>
                                <code>typeof</code> for primitives
                            </li>
                            <li>
                                <code>instanceof</code> for class instances
                            </li>
                            <li>
                                <code>in</code> for checking property existence
                            </li>
                            <li>Type predicates for custom type guards</li>
                        </ul>
                    </li>
                    <li>
                        Design your types with discriminated unions when
                        possible
                    </li>
                    <li>
                        Use <code>never</code> type for exhaustiveness checking
                    </li>
                    <li>
                        Create reusable type guard functions for complex types
                    </li>
                    <li>
                        Consider assertion functions for validation that should
                        throw errors
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default TypeGuards;
