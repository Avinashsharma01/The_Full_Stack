import {
    type FC,
    useState,
    useRef,
    type FormEvent,
    type ChangeEvent,
    type MouseEvent,
} from "react";
import CodeBlock from "./shared/CodeBlock";

const EventHandling: FC = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [comments, setComments] = useState<string[]>([]);

    // Form ref for accessing form elements
    const formRef = useRef<HTMLFormElement>(null);

    // 1. Handling input change events
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    // 2. Handling textarea change events (commented for demo purposes)
    // const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    //     setInputValue(event.target.value);
    // };

    // 3. Handling select change events
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        console.log("Selected option:", event.target.value);
    };

    // 4. Handling form submit events
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (inputValue.trim()) {
            setComments([...comments, inputValue]);
            setInputValue("");

            // Reset the form
            if (formRef.current) {
                formRef.current.reset();
            }
        }
    };

    // 5. Handling mouse events
    const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        // You can access the button properties
        console.log("Button clicked:", event.currentTarget.name);
    };

    // With extra data passed to the event handler
    const handleItemClick = (id: number, event: MouseEvent<HTMLLIElement>) => {
        console.log(`Item ${id} clicked at position:`, {
            x: event.clientX,
            y: event.clientY,
        });
    };

    // 6. Keyboard events
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            console.log("Enter key pressed");
            // Do something when Enter is pressed
        }
    };

    // 7. Drag events
    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData("text/plain", "Dragged content");
    };

    // 8. Focus and blur events
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        console.log("Input focused:", event.target.name);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        console.log("Input lost focus:", event.target.name);
    };

    // 9. Custom event handler type
    type CustomButtonProps = {
        onClick: (id: string) => void;
        label: string;
        id: string;
    };

    const CustomButton: FC<CustomButtonProps> = ({ onClick, label, id }) => {
        return <button onClick={() => onClick(id)}>{label}</button>;
    };

    const handleCustomButtonClick = (buttonId: string) => {
        console.log(`Custom button ${buttonId} clicked`);
    };

    return (
        <div className="concept-section">
            <h2>Event Handling with TypeScript</h2>
            <p>
                TypeScript provides robust typing for React event handlers,
                ensuring you use the correct event types for different
                interactions.
            </p>

            <h3>Form Events Example</h3>
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="event-example-form"
            >
                <div className="form-group">
                    <label htmlFor="comment">Add a comment:</label>
                    <input
                        type="text"
                        id="comment"
                        name="comment"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder="Type your comment"
                    />

                    <select onChange={handleSelectChange} defaultValue="">
                        <option value="" disabled>
                            Select a category
                        </option>
                        <option value="general">General</option>
                        <option value="feature">Feature Request</option>
                        <option value="bug">Bug Report</option>
                    </select>

                    <button
                        type="submit"
                        name="submit-button"
                        onClick={handleButtonClick}
                    >
                        Add Comment
                    </button>
                </div>
            </form>

            <div className="comments-section">
                <h4>Comments:</h4>
                {comments.length === 0 ? (
                    <p>No comments yet</p>
                ) : (
                    <ul>
                        {comments.map((comment, index) => (
                            <li
                                key={index}
                                onClick={(e) => handleItemClick(index, e)}
                            >
                                {comment}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div
                className="draggable-element"
                draggable
                onDragStart={handleDragStart}
            >
                Drag me!
            </div>

            <div className="custom-buttons">
                <CustomButton
                    id="button1"
                    label="Custom Button 1"
                    onClick={handleCustomButtonClick}
                />
                <CustomButton
                    id="button2"
                    label="Custom Button 2"
                    onClick={handleCustomButtonClick}
                />
            </div>

            <h3>Event Types in TypeScript</h3>
            <CodeBlock>
                {`// Form event types
(event: FormEvent<HTMLFormElement>) => void
(event: ChangeEvent<HTMLInputElement>) => void
(event: ChangeEvent<HTMLTextAreaElement>) => void
(event: ChangeEvent<HTMLSelectElement>) => void

// Mouse event types
(event: MouseEvent<HTMLButtonElement>) => void
(event: MouseEvent<HTMLDivElement>) => void

// Keyboard event type
(event: KeyboardEvent<HTMLInputElement>) => void

// Drag event type
(event: DragEvent<HTMLDivElement>) => void

// Focus event types
(event: FocusEvent<HTMLInputElement>) => void`}
            </CodeBlock>

            <h3>Typed Event Handler Examples</h3>
            <CodeBlock>
                {`// Input change handler
const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  setInputValue(event.target.value);
};

// Form submit handler
const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // Form submission logic
};

// With extra parameters
const handleItemClick = (id: number, event: MouseEvent<HTMLLIElement>) => {
  console.log(\`Item \${id} clicked\`);
};`}
            </CodeBlock>

            <h3>Custom Event Handler Props</h3>
            <CodeBlock>
                {`// Define the props interface with event handler
type CustomButtonProps = {
  onClick: (id: string) => void;
  label: string;
  id: string;
};

// Component with custom event handler
const CustomButton: FC<CustomButtonProps> = ({ onClick, label, id }) => {
  return (
    <button onClick={() => onClick(id)}>
      {label}
    </button>
  );
};`}
            </CodeBlock>

            <div className="info-box">
                <h4>Best Practices for Event Handling in TypeScript</h4>
                <ul>
                    <li>
                        Always use the appropriate event type for each HTML
                        element
                    </li>
                    <li>
                        Use type parameters to specify the element type (e.g.,{" "}
                        <code>MouseEvent&lt;HTMLButtonElement&gt;</code>)
                    </li>
                    <li>
                        Remember to prevent default behaviors when needed (e.g.,{" "}
                        <code>event.preventDefault()</code>)
                    </li>
                    <li>
                        For custom event handlers, define parameter types
                        explicitly
                    </li>
                    <li>Use function type annotations for callback props</li>
                    <li>
                        Avoid using <code>any</code> type for event handlers
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default EventHandling;
