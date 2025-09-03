import { type FC, type ReactNode } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
    language?: string;
    children: ReactNode;
}

const CodeBlock: FC<CodeBlockProps> = ({
    language = "typescript",
    children,
}) => {
    // Convert children to string if it's not already
    const codeString =
        typeof children === "string" ? children : String(children);

    return (
        <div className="code-block-container">
            <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                customStyle={{
                    padding: "1.8rem",
                    marginTop: "1.2rem",
                    marginBottom: "1.2rem",
                    borderRadius: "8px",
                    background: "#1c1c1c",
                    border: "1px solid #333",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                    fontSize: "0.95em",
                    // fontSize: "1em",
                    lineHeight: "1.5",
                }}
                showLineNumbers={true}
                wrapLines={true}
                wrapLongLines={true}
            >
                {codeString}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;
