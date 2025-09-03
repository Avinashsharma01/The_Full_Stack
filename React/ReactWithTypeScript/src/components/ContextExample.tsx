/* eslint-disable react-refresh/only-export-components */
import {
    type FC,
    createContext,
    useContext,
    useState,
    type ReactNode,
    useCallback,
} from "react";
import CodeBlock from "./shared/CodeBlock";

// 1. Define the shape of your context data
interface Theme {
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    backgroundColor: string;
}

// Available themes
const themes: Record<string, Theme> = {
    light: {
        primaryColor: "#0078d7",
        secondaryColor: "#6c757d",
        textColor: "#333333",
        backgroundColor: "#f8f9fa",
    },
    dark: {
        primaryColor: "#61dafb",
        secondaryColor: "#bb86fc",
        textColor: "#e9ecef",
        backgroundColor: "#242526",
    },
};

// 2. Define the context type, including any functions to update the context
interface ThemeContextType {
    theme: Theme;
    themeName: string;
    setTheme: (name: string) => void;
}

// 3. Create the context with a default value
// The default value is only used when a component does not have a matching Provider above it
const ThemeContext = createContext<ThemeContextType | null>(null);

// 4. Create a custom hook to use the context
export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
};

// 5. Create a provider component
interface ThemeProviderProps {
    children: ReactNode;
    defaultTheme?: string;
}

const ThemeProvider: FC<ThemeProviderProps> = ({
    children,
    defaultTheme = "light",
}) => {
    const [themeName, setThemeName] = useState<string>(defaultTheme);

    // Ensure we're using a valid theme name
    const validThemeName = themes[themeName] ? themeName : "light";

    const theme = themes[validThemeName];

    const setTheme = useCallback((name: string) => {
        if (themes[name]) {
            setThemeName(name);
        }
    }, []);

    // Create the context value object
    const contextValue: ThemeContextType = {
        theme,
        themeName: validThemeName,
        setTheme,
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

// 6. Sample components that consume the context
const ThemedButton: FC<{ label: string; onClick?: () => void }> = ({
    label,
    onClick,
}) => {
    const { theme } = useTheme();

    const buttonStyle = {
        backgroundColor: theme.primaryColor,
        color: theme.textColor,
        border: "none",
        padding: "8px 16px",
        borderRadius: "4px",
        cursor: "pointer",
    };

    return (
        <button style={buttonStyle} onClick={onClick}>
            {label}
        </button>
    );
};

const ThemedPanel: FC<{ title: string; children: ReactNode }> = ({
    title,
    children,
}) => {
    const { theme } = useTheme();

    const panelStyle = {
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        border: `1px solid ${theme.secondaryColor}`,
        borderRadius: "4px",
        padding: "16px",
        margin: "8px 0",
    };

    const headerStyle = {
        borderBottom: `1px solid ${theme.secondaryColor}`,
        paddingBottom: "8px",
        marginBottom: "16px",
        color: theme.primaryColor,
    };

    return (
        <div style={panelStyle}>
            <h3 style={headerStyle}>{title}</h3>
            {children}
        </div>
    );
};

const ThemeSwitcher: FC = () => {
    const { themeName, setTheme } = useTheme();

    return (
        <div>
            <label>
                <input
                    type="radio"
                    value="light"
                    checked={themeName === "light"}
                    onChange={() => setTheme("light")}
                />
                Light Theme
            </label>
            <label style={{ marginLeft: "16px" }}>
                <input
                    type="radio"
                    value="dark"
                    checked={themeName === "dark"}
                    onChange={() => setTheme("dark")}
                />
                Dark Theme
            </label>
        </div>
    );
};

// 7. User context example
interface User {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean;
}

interface UserContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    updateUserProfile: (userData: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }

    return context;
};

// 8. Main Context API component
const ContextExample: FC = () => {
    // User authentication demo state
    const [user, setUser] = useState<User | null>(null);
    const [loginEmail, setLoginEmail] = useState<string>("");

    // Mock login function
    const login = useCallback(
        async (email: string, password: string): Promise<boolean> => {
            // Simulate API call
            if (email && password) {
                // Simulate loading delay
                await new Promise((resolve) => setTimeout(resolve, 500));

                setUser({
                    id: 1,
                    name: email.split("@")[0],
                    email,
                    isAdmin: email.includes("admin"),
                });

                return true;
            }
            return false;
        },
        []
    );

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    const updateUserProfile = useCallback((userData: Partial<User>) => {
        setUser((prev) => {
            if (!prev) return null;
            return { ...prev, ...userData };
        });
    }, []);

    // Create user context value
    const userContextValue: UserContextType = {
        user,
        login,
        logout,
        updateUserProfile,
    };

    return (
        <div className="concept-section">
            <h2>Context API with TypeScript</h2>
            <p>
                The Context API allows you to share state between components
                without prop drilling. TypeScript adds type safety to your
                context values and consumers.
            </p>

            <h3>Creating and Using Context</h3>
            <CodeBlock>
                {`// 1. Define the shape of your context data
interface Theme {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  backgroundColor: string;
}

// 2. Define the context type
interface ThemeContextType {
  theme: Theme;
  themeName: string;
  setTheme: (name: string) => void;
}

// 3. Create the context with a default value
const ThemeContext = createContext<ThemeContextType | null>(null);

// 4. Create a custom hook to use the context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

// 5. Create a provider component
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: string;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme = 'light' 
}) => {
  const [themeName, setThemeName] = useState<string>(defaultTheme);
  // Provider implementation...
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};`}
            </CodeBlock>

            <h3>Context in Action</h3>
            <p>
                Here's an example of context in action, with a theme provider
                that allows components to access and change the theme:
            </p>

            <ThemeProvider>
                <div className="example-box">
                    <ThemeSwitcher />

                    <ThemedPanel title="Theme Context Example">
                        <p>This panel uses the current theme from context.</p>
                        <ThemedButton label="Themed Button" />
                    </ThemedPanel>
                </div>
            </ThemeProvider>

            <h3>User Authentication Context Example</h3>
            <CodeBlock>
                {`interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (userData: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
};`}
            </CodeBlock>

            <UserContext.Provider value={userContextValue}>
                <div className="example-box">
                    {user ? (
                        <div>
                            <h4>Logged In User</h4>
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>
                                Role: {user.isAdmin ? "Administrator" : "User"}
                            </p>
                            <button onClick={logout}>Log Out</button>
                        </div>
                    ) : (
                        <div>
                            <h4>Login Form</h4>
                            <input
                                type="email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                placeholder="Email"
                            />
                            <input
                                type="password"
                                value="password" // Just for demo
                                readOnly
                                placeholder="Password"
                            />
                            <button
                                onClick={() => login(loginEmail, "password")}
                            >
                                Log In
                            </button>
                            <p>
                                <small>
                                    Try with any email. Use "admin@example.com"
                                    to get admin rights.
                                </small>
                            </p>
                        </div>
                    )}
                </div>
            </UserContext.Provider>

            <div className="info-box">
                <h4>Best Practices for Context with TypeScript</h4>
                <ul>
                    <li>Always define interfaces for your context value</li>
                    <li>
                        Create a custom hook to use your context (with proper
                        error handling)
                    </li>
                    <li>
                        Set the initial context value to <code>null</code> and
                        use type union <code>ContextType | null</code> when a
                        default value doesn't make sense
                    </li>
                    <li>
                        Use <code>useCallback</code> for functions in your
                        context value to prevent unnecessary re-renders
                    </li>
                    <li>
                        Split complex applications into multiple contexts
                        instead of one giant context
                    </li>
                    <li>
                        Consider using context with reducers for complex state
                        management
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ContextExample;
