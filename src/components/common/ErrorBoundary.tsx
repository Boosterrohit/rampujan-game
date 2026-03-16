import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // log to console or remote service
    console.error("ErrorBoundary caught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-800 text-white rounded">
          <h2 className="font-bold">Something went wrong.</h2>
          <p>{this.state.error?.message}</p>
          {this.props.fallback}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
