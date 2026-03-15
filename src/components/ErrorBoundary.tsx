import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  private get isRussian(): boolean {
    try {
      return localStorage.getItem("bbb-language") === "ru";
    } catch {
      return false;
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h1 style={{ color: "#dc2626", marginBottom: "1rem" }}>
            {this.isRussian ? "Что-то пошло не так" : "Something went wrong"}
          </h1>
          <pre style={{ background: "#f3f4f6", padding: "1rem", borderRadius: "0.5rem", textAlign: "left", overflow: "auto", maxWidth: "600px", margin: "0 auto" }}>
            {this.state.error?.message}
            {"\n"}
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
