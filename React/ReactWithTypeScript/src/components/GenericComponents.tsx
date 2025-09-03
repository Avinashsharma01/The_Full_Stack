import { type FC, type ReactNode, useState } from "react";
import CodeBlock from "./shared/CodeBlock";

// 1. Basic generic component
interface ListProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;
}

// Generic function component
function List<T>({ items, renderItem }: ListProps<T>) {
    return (
        <ul className="generic-list">
            {items.map((item, index) => (
                <li key={index}>{renderItem(item, index)}</li>
            ))}
        </ul>
    );
}

// 2. Generic component with constraints
interface HasId {
    id: string | number;
}

interface ItemListProps<T extends HasId> {
    items: T[];
    onSelect: (item: T) => void;
    renderItem: (item: T) => ReactNode;
    selectedId?: string | number;
}

function ItemList<T extends HasId>({
    items,
    onSelect,
    renderItem,
    selectedId,
}: ItemListProps<T>) {
    return (
        <ul className="item-list">
            {items.map((item) => (
                <li
                    key={item.id}
                    className={selectedId === item.id ? "selected" : ""}
                    onClick={() => onSelect(item)}
                >
                    {renderItem(item)}
                </li>
            ))}
        </ul>
    );
}

// 3. Generic dropdown component
interface Option<T> {
    label: string;
    value: T;
}

interface DropdownProps<T> {
    options: Option<T>[];
    value: T | null;
    onChange: (value: T) => void;
    placeholder?: string;
}

function Dropdown<T>({
    options,
    value,
    onChange,
    placeholder = "Select an option",
}: DropdownProps<T>) {
    // Find the selected option
    const selectedOption = options.find((option) => option.value === value);

    return (
        <select
            value={
                selectedOption ? options.indexOf(selectedOption).toString() : ""
            }
            onChange={(e) => {
                const index = parseInt(e.target.value, 10);
                if (!isNaN(index)) {
                    onChange(options[index].value);
                }
            }}
        >
            <option value="" disabled>
                {placeholder}
            </option>
            {options.map((option, index) => (
                <option key={index} value={index.toString()}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

// 4. Generic higher-order component (HOC)
interface WithLoadingProps {
    loading: boolean;
}

// HOC that adds loading state to any component
function withLoading<T extends object>(Component: React.ComponentType<T>) {
    return function WithLoading({ loading, ...props }: T & WithLoadingProps) {
        if (loading) {
            return <div className="loading-spinner">Loading...</div>;
        }

        return <Component {...(props as T)} />;
    };
}

// Component to use with the HOC
interface UserProfileProps {
    username: string;
    email: string;
}

const UserProfile: FC<UserProfileProps> = ({ username, email }) => {
    return (
        <div className="user-profile">
            <h4>{username}</h4>
            <p>{email}</p>
        </div>
    );
};

// Create a new component with loading capability
const UserProfileWithLoading = withLoading<UserProfileProps>(UserProfile);

// Main component to demonstrate generic components
const GenericComponents: FC = () => {
    // Example data for generic components
    const numbers = [1, 2, 3, 4, 5];
    const strings = ["TypeScript", "React", "Generics", "Components"];

    // For ItemList
    interface User extends HasId {
        id: number;
        name: string;
        email: string;
    }

    const users: User[] = [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com" },
    ];

    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    // For Dropdown
    interface Country {
        code: string;
        name: string;
    }

    const countries: Option<Country>[] = [
        {
            label: "United States",
            value: { code: "US", name: "United States of America" },
        },
        {
            label: "Canada",
            value: { code: "CA", name: "Canada" },
        },
        {
            label: "United Kingdom",
            value: { code: "GB", name: "United Kingdom of Great Britain" },
        },
    ];

    const [selectedCountry, setSelectedCountry] = useState<Country | null>(
        null
    );

    // For withLoading HOC
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const toggleLoading = () => {
        setIsLoading(!isLoading);
    };

    return (
        <div className="concept-section">
            <h2>Generic Components in TypeScript</h2>
            <p>
                Generic components allow you to create reusable components that
                can work with different types while maintaining type safety.
            </p>

            <h3>1. Basic Generic Component</h3>
            <CodeBlock>
                {`interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item, index)}</li>
      ))}
    </ul>
  );
}`}
            </CodeBlock>

            <div className="example-box">
                <h4>Example with numbers:</h4>
                <List
                    items={numbers}
                    renderItem={(item) => <span>Number: {item}</span>}
                />

                <h4>Example with strings:</h4>
                <List
                    items={strings}
                    renderItem={(item) => <strong>{item}</strong>}
                />
            </div>

            <h3>2. Generic Component with Type Constraints</h3>
            <CodeBlock>
                {`interface HasId {
  id: string | number;
}

interface ItemListProps<T extends HasId> {
  items: T[];
  onSelect: (item: T) => void;
  renderItem: (item: T) => ReactNode;
  selectedId?: string | number;
}

function ItemList<T extends HasId>({
  items,
  onSelect,
  renderItem,
  selectedId
}: ItemListProps<T>) {
  return (
    <ul>
      {items.map((item) => (
        <li 
          key={item.id}
          className={selectedId === item.id ? 'selected' : ''}
          onClick={() => onSelect(item)}
        >
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}`}
            </CodeBlock>

            <div className="example-box">
                <h4>User List Example:</h4>
                <ItemList
                    items={users}
                    selectedId={selectedUserId ?? undefined}
                    onSelect={(user) => setSelectedUserId(user.id)}
                    renderItem={(user) => (
                        <div>
                            <strong>{user.name}</strong> - {user.email}
                        </div>
                    )}
                />
                {selectedUserId && <p>Selected User ID: {selectedUserId}</p>}
            </div>

            <h3>3. Generic Dropdown Component</h3>
            <CodeBlock>
                {`interface Option<T> {
  label: string;
  value: T;
}

interface DropdownProps<T> {
  options: Option<T>[];
  value: T | null;
  onChange: (value: T) => void;
  placeholder?: string;
}

function Dropdown<T>({
  options,
  value,
  onChange,
  placeholder = 'Select an option'
}: DropdownProps<T>) {
  // Implementation details...
}`}
            </CodeBlock>

            <div className="example-box">
                <h4>Country Dropdown Example:</h4>
                <Dropdown
                    options={countries}
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                    placeholder="Select a country"
                />
                {selectedCountry && (
                    <p>
                        Selected: {selectedCountry.name} ({selectedCountry.code}
                        )
                    </p>
                )}
            </div>

            <h3>4. Generic Higher-Order Component (HOC)</h3>
            <CodeBlock>
                {`interface WithLoadingProps {
  loading: boolean;
}

// HOC that adds loading state to any component
function withLoading<T extends object>(Component: React.ComponentType<T>) {
  return function WithLoading({ loading, ...props }: T & WithLoadingProps) {
    if (loading) {
      return <div className="loading-spinner">Loading...</div>;
    }
    
    return <Component {...props as T} />;
  };
}`}
            </CodeBlock>

            <div className="example-box">
                <h4>HOC Example:</h4>
                <button onClick={toggleLoading}>Toggle Loading State</button>
                <div className="component-with-loading">
                    <UserProfileWithLoading
                        loading={isLoading}
                        username="john_doe"
                        email="john@example.com"
                    />
                </div>
            </div>

            <div className="info-box">
                <h4>Best Practices for Generic Components</h4>
                <ul>
                    <li>
                        Use generics when a component needs to work with
                        different data types
                    </li>
                    <li>
                        Add type constraints (<code>extends</code>) to limit
                        acceptable types
                    </li>
                    <li>Provide meaningful default values when appropriate</li>
                    <li>
                        Use multiple type parameters when needed (e.g.,{" "}
                        <code>&lt;T, K&gt;</code>)
                    </li>
                    <li>
                        Consider component readability and maintainability when
                        using complex generics
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default GenericComponents;
