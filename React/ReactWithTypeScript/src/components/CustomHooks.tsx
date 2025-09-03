/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FC, useState, useEffect, useCallback, useRef } from "react";
import CodeBlock from "./shared/CodeBlock";

// 1. Custom hook for managing local storage
function useLocalStorage<T>(key: string, initialValue: T) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }

        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.error(error);
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter function that
    // persists the new value to localStorage
    const setValue = useCallback(
        (value: T | ((val: T) => T)) => {
            try {
                // Allow value to be a function so we have same API as useState
                const valueToStore =
                    value instanceof Function ? value(storedValue) : value;

                // Save state
                setStoredValue(valueToStore);

                // Save to local storage
                if (typeof window !== "undefined") {
                    window.localStorage.setItem(
                        key,
                        JSON.stringify(valueToStore)
                    );
                }
            } catch (error) {
                // A more advanced implementation would handle the error case
                console.error(error);
            }
        },
        [key, storedValue]
    );

    return [storedValue, setValue] as const;
}

// 2. Custom hook for form handling with validation
interface FormField<T> {
    value: T;
    error: string | null;
    touched: boolean;
}

type FormFields<T> = {
    [K in keyof T]: FormField<T[K]>;
};

interface UseFormOptions<T> {
    initialValues: T;
    onSubmit: (values: T) => void;
    validate?: (values: T) => Partial<Record<keyof T, string>>;
}

function useForm<T extends Record<string, any>>({
    initialValues,
    onSubmit,
    validate,
}: UseFormOptions<T>) {
    // Initialize form state with values, no errors, and untouched
    const [formState, setFormState] = useState<FormFields<T>>(() => {
        const initialState = {} as FormFields<T>;

        // Initialize each field
        (Object.keys(initialValues) as Array<keyof T>).forEach((key) => {
            initialState[key] = {
                value: initialValues[key],
                error: null,
                touched: false,
            };
        });

        return initialState;
    });

    // Get current values from form state
    const values = Object.entries(formState).reduce((acc, [key, field]) => {
        acc[key as keyof T] = field.value;
        return acc;
    }, {} as T);

    // Handle field change
    const handleChange = useCallback((field: keyof T, value: any) => {
        setFormState((prev) => ({
            ...prev,
            [field]: {
                ...prev[field],
                value,
                touched: true,
            },
        }));
    }, []);

    // Validate form
    const validateForm = useCallback(() => {
        if (!validate) return true;

        const errors = validate(values);

        if (Object.keys(errors).length === 0) {
            return true;
        }

        // Update form state with errors
        setFormState((prev) => {
            const newState = { ...prev };

            (Object.keys(errors) as Array<keyof T>).forEach((key) => {
                if (errors[key]) {
                    newState[key] = {
                        ...newState[key],
                        error: errors[key] as string,
                    };
                }
            });

            return newState;
        });

        return false;
    }, [validate, values]);

    // Handle form submission
    const handleSubmit = useCallback(
        (e?: React.FormEvent) => {
            if (e) e.preventDefault();

            // Mark all fields as touched
            setFormState((prev) => {
                const newState = { ...prev };

                (Object.keys(newState) as Array<keyof T>).forEach((key) => {
                    newState[key] = {
                        ...newState[key],
                        touched: true,
                    };
                });

                return newState;
            });

            // Validate and submit if valid
            if (validateForm()) {
                onSubmit(values);
                return true;
            }

            return false;
        },
        [onSubmit, validateForm, values]
    );

    return {
        values,
        formState,
        handleChange,
        handleSubmit,
        validateForm,
        // Reset the form to initial values
        resetForm: useCallback(() => {
            const initialState = {} as FormFields<T>;

            (Object.keys(initialValues) as Array<keyof T>).forEach((key) => {
                initialState[key] = {
                    value: initialValues[key],
                    error: null,
                    touched: false,
                };
            });

            setFormState(initialState);
        }, [initialValues]),
    };
}

// 3. Custom hook for debounced values
function useDebounce<T>(value: T, delay: number): T {
    // State and setter for debounced value
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Update debounced value after delay
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cancel the timeout if value changes or component unmounts
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

// 4. Custom hook for window size
interface WindowSize {
    width: number;
    height: number;
}

function useWindowSize(): WindowSize {
    // Initialize with undefined to avoid mismatch during server-side rendering
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
    });

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures this only runs on mount and unmount

    return windowSize;
}

// 5. Custom hook for previous value
function usePrevious<T>(value: T): T | undefined {
    // The ref object is a generic container whose current property is mutable
    // and can hold any value, similar to an instance property on a class
    const ref = useRef<T>();

    // Store current value in ref
    useEffect(() => {
        ref.current = value;
    }, [value]); // Only re-run if value changes

    // Return previous value (happens before update in useEffect above)
    return ref.current;
}

// 6. Custom hook for API fetching
interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

function useFetch<T>(url: string, options?: RequestInit) {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setState((prev) => ({ ...prev, loading: true }));

            try {
                const response = await fetch(url, options);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (isMounted) {
                    setState({ data, loading: false, error: null });
                }
            } catch (error) {
                if (isMounted) {
                    setState({
                        data: null,
                        loading: false,
                        error: error as Error,
                    });
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [url, options]);

    return state;
}

// Demo component to showcase custom hooks
const CustomHooks: FC = () => {
    // Demo for useLocalStorage
    const [name, setName] = useLocalStorage<string>("name", "");
    const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", false);

    // Demo for useForm
    interface LoginForm {
        username: string;
        password: string;
    }

    const { values, formState, handleChange, handleSubmit, resetForm } =
        useForm<LoginForm>({
            initialValues: {
                username: "",
                password: "",
            },
            validate: (values) => {
                const errors: Partial<Record<keyof LoginForm, string>> = {};

                if (!values.username) {
                    errors.username = "Username is required";
                }

                if (!values.password) {
                    errors.password = "Password is required";
                } else if (values.password.length < 6) {
                    errors.password = "Password must be at least 6 characters";
                }

                return errors;
            },
            onSubmit: (values) => {
                alert(
                    `Form submitted with: ${JSON.stringify(values, null, 2)}`
                );
            },
        });

    // Demo for useDebounce
    const [searchTerm, setSearchTerm] = useState<string>("");
    const debouncedSearchTerm = useDebounce<string>(searchTerm, 500);

    // Demo for useWindowSize
    const windowSize = useWindowSize();

    // Demo for usePrevious
    const [count, setCount] = useState<number>(0);
    const previousCount = usePrevious<number>(count);

    return (
        <div className="concept-section">
            <h2>Custom Hooks with TypeScript</h2>
            <p>
                Custom hooks allow you to extract component logic into reusable
                functions. TypeScript adds type safety to your hooks and
                improves their reusability.
            </p>

            <h3>1. useLocalStorage&lt;T&gt;</h3>
            <p>A custom hook that syncs state with localStorage.</p>
            <CodeBlock>
                {`function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);
  
  return [storedValue, setValue] as const;
}`}
            </CodeBlock>

            <div className="example-box">
                <h4>useLocalStorage Example:</h4>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                        />
                    </label>
                    <p>Stored name: {name || "None"}</p>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={darkMode}
                            onChange={(e) => setDarkMode(e.target.checked)}
                        />
                        Dark Mode
                    </label>
                </div>
            </div>

            <h3>2. useForm&lt;T&gt;</h3>
            <p>A custom hook for form management with validation.</p>
            <CodeBlock>
                {`function useForm<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate
}: UseFormOptions<T>) {
  // Implementation details...
  
  return {
    values,
    formState,
    handleChange,
    handleSubmit,
    validateForm,
    resetForm
  };
}`}
            </CodeBlock>

            <div className="example-box">
                <h4>useForm Example:</h4>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            type="text"
                            value={values.username}
                            onChange={(e) =>
                                handleChange("username", e.target.value)
                            }
                        />
                        {formState.username.touched &&
                            formState.username.error && (
                                <div className="error">
                                    {formState.username.error}
                                </div>
                            )}
                    </div>

                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            type="password"
                            value={values.password}
                            onChange={(e) =>
                                handleChange("password", e.target.value)
                            }
                        />
                        {formState.password.touched &&
                            formState.password.error && (
                                <div className="error">
                                    {formState.password.error}
                                </div>
                            )}
                    </div>

                    <div className="form-buttons">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={resetForm}>
                            Reset
                        </button>
                    </div>
                </form>
            </div>

            <h3>3. useDebounce&lt;T&gt;</h3>
            <p>
                A custom hook that delays updating a value until after a
                specified delay.
            </p>
            <CodeBlock>
                {`function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  
  return debouncedValue;
}`}
            </CodeBlock>

            <div className="example-box">
                <h4>useDebounce Example:</h4>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                />
                <p>Search term: {searchTerm}</p>
                <p>Debounced search term (500ms): {debouncedSearchTerm}</p>
            </div>

            <h3>4. useWindowSize</h3>
            <p>A custom hook that tracks window dimensions.</p>
            <CodeBlock>
                {`function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return windowSize;
}`}
            </CodeBlock>

            <div className="example-box">
                <h4>useWindowSize Example:</h4>
                <p>Window width: {windowSize.width}px</p>
                <p>Window height: {windowSize.height}px</p>
            </div>

            <h3>5. usePrevious&lt;T&gt;</h3>
            <p>
                A custom hook that remembers the previous value of a variable.
            </p>
            <CodeBlock>
                {`function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}`}
            </CodeBlock>

            <div className="example-box">
                <h4>usePrevious Example:</h4>
                <p>Current count: {count}</p>
                <p>
                    Previous count:{" "}
                    {previousCount !== undefined ? previousCount : "None"}
                </p>
                <button onClick={() => setCount(count + 1)}>Increment</button>
            </div>

            <div className="info-box">
                <h4>Best Practices for Custom Hooks with TypeScript</h4>
                <ul>
                    <li>
                        Use generics to make hooks reusable with different types
                    </li>
                    <li>
                        Add proper type annotations for parameters and return
                        values
                    </li>
                    <li>
                        Use type inference when possible to reduce verbosity
                    </li>
                    <li>
                        For complex return values, consider using objects with
                        named properties
                    </li>
                    <li>
                        Use <code>as const</code> when returning tuples to
                        preserve the exact types
                    </li>
                    <li>
                        Use interfaces to define the structure of hook
                        parameters and return values
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default CustomHooks;
