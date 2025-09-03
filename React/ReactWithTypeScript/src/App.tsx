import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink,
    Navigate,
} from "react-router-dom";
import "./App.css";

// Import all components
import BasicTypes from "./components/BasicTypes";
import InterfacesAndTypes from "./components/InterfacesAndTypes";
import FunctionComponents from "./components/FunctionComponents";
import PropsExample from "./components/PropsExample";
import HooksWithTS from "./components/HooksWithTS";
import EventHandling from "./components/EventHandling";
import GenericComponents from "./components/GenericComponents";
import ContextExample from "./components/ContextExample";
import UtilityTypes from "./components/UtilityTypes";
import CustomHooks from "./components/CustomHooks";
import TypeAssertions from "./components/TypeAssertions";
import TypeGuards from "./components/TypeGuards";

// Home component
const Home = () => (
    <div className="concept-section home-section">
        <div className="welcome-container">
            <div className="welcome-header">
                <h2>Welcome to React TypeScript Guide</h2>
                <div className="badge">React 19 + TypeScript 5.8</div>
            </div>
            <p className="welcome-text">
                This interactive application demonstrates the most commonly used
                TypeScript concepts in React development. Click on any topic in
                the sidebar to explore detailed examples with code snippets.
            </p>
        </div>

        <div className="features-grid">
            <div className="feature-card">
                <div className="feature-icon">🛡️</div>
                <h3>Type Safety</h3>
                <p>
                    Catch errors during development with TypeScript's static
                    type checking
                </p>
            </div>
            <div className="feature-card">
                <div className="feature-icon">🔍</div>
                <h3>IDE Support</h3>
                <p>
                    Enjoy better autocomplete, inline documentation, and
                    refactoring tools
                </p>
            </div>
            <div className="feature-card">
                <div className="feature-icon">📝</div>
                <h3>Self-Documenting</h3>
                <p>
                    Types serve as documentation that stays in sync with your
                    code
                </p>
            </div>
            <div className="feature-card">
                <div className="feature-icon">🔄</div>
                <h3>Refactoring</h3>
                <p>Confidently refactor large codebases with type checking</p>
            </div>
        </div>

        <div className="info-box">
            <h3>How to Use This Guide</h3>
            <p>
                Each section in the sidebar focuses on a specific TypeScript
                concept used in React. The examples include both the type
                definitions and practical React component implementations. Try
                modifying the examples in your own project to see TypeScript in
                action!
            </p>
            <div className="navigation-hint">
                <span className="hint-arrow">👈</span> Start with Basic Types
                and work your way through the concepts
            </div>
        </div>
    </div>
);

// Main application
const App = () => {
    return (
        <Router>
            <div className="app-container">
                <header>
                    <div className="logo-container">
                        <img
                            src="/react.svg"
                            alt="TypeScript Logo"
                            className="react-logo"
                        />
                    </div>
                    <div className="textPart">
                        <h1>React TypeScript Concepts</h1>
                        <p>
                            Learn the most used TypeScript concepts in React
                            development
                        </p>
                    </div>
                    <div className="logo-container">
                        <img
                            src="/typescript-logo.svg"
                            alt="TypeScript Logo"
                            className="ts-logo"
                        />
                    </div>
                </header>{" "}
                <div className="main-content">
                    <nav className="sidebar">
                        <h2>Concepts</h2>
                        <ul>
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive ? "active" : ""
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/basic-types"
                                    className={({ isActive }) =>
                                        isActive ? "active" : ""
                                    }
                                >
                                    Basic Types
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/interfaces"
                                    className={({ isActive }) =>
                                        isActive ? "active" : ""
                                    }
                                >
                                    Interfaces & Types
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/function-components"
                                    className={({ isActive }) =>
                                        isActive ? "active" : ""
                                    }
                                >
                                    Function Components
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/props"
                                    className={({ isActive }) =>
                                        isActive ? "active" : ""
                                    }
                                >
                                    Props & State
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/hooks"
                                    className={({ isActive }) =>
                                        isActive ? "active" : ""
                                    }
                                >
                                    Hooks with TypeScript
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/events"
                                    className={({ isActive }) =>
                                        isActive ? "active" : ""
                                    }
                                >
                                    Event Handling
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/generics"
                                    className={({ isActive }) =>
                                        isActive ? "active" : ""
                                    }
                                >
                                    Generics
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/context"
                                    className={({ isActive }) =>
                                        isActive ? "active" : ""
                                    }
                                >
                                    Context API
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/utility-types"
                                    className={({ isActive }) =>
                                        isActive ? "active" : ""
                                    }
                                >
                                    Utility Types
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/custom-hooks"
                                    className={({ isActive }) =>
                                        isActive ? "active" : ""
                                    }
                                >
                                    Custom Hooks
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/type-assertions"
                                    className={({ isActive }) =>
                                        isActive ? "active" : ""
                                    }
                                >
                                    Type Assertions
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/type-guards"
                                    className={({ isActive }) =>
                                        isActive ? "active" : ""
                                    }
                                >
                                    Type Guards
                                </NavLink>
                            </li>
                        </ul>
                    </nav>

                    <section className="content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/basic-types"
                                element={<BasicTypes />}
                            />
                            <Route
                                path="/interfaces"
                                element={<InterfacesAndTypes />}
                            />
                            <Route
                                path="/function-components"
                                element={<FunctionComponents />}
                            />
                            <Route
                                path="/props"
                                element={
                                    <PropsExample
                                        name="TypeScript User"
                                        age={30}
                                        isActive={true}
                                    />
                                }
                            />
                            <Route path="/hooks" element={<HooksWithTS />} />
                            <Route path="/events" element={<EventHandling />} />
                            <Route
                                path="/generics"
                                element={<GenericComponents />}
                            />
                            <Route
                                path="/context"
                                element={<ContextExample />}
                            />
                            <Route
                                path="/utility-types"
                                element={<UtilityTypes />}
                            />
                            <Route
                                path="/custom-hooks"
                                element={<CustomHooks />}
                            />
                            <Route
                                path="/type-assertions"
                                element={<TypeAssertions />}
                            />
                            <Route
                                path="/type-guards"
                                element={<TypeGuards />}
                            />
                            <Route
                                path="*"
                                element={<Navigate to="/" replace />}
                            />
                        </Routes>
                    </section>
                </div>
            </div>
        </Router>
    );
};

export default App;
