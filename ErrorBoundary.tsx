// ErrorBoundary.tsx
import { Component, ReactNode } from "react";

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return <div className="p-4 text-sm text-red-600">Something went wrong in the chat UI.</div>;
    }
    return this.props.children;
  }
}
