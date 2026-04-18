import { Component, type ComponentChildren } from "preact";

interface Props {
  children: ComponentChildren;
  fallback?: ComponentChildren;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static override getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: any) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div class="p-6 rounded-2xl border border-rose-200 bg-rose-50/50 flex flex-col items-center justify-center text-center">
          <div class="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-4">
            <span class="text-2xl">⚠️</span>
          </div>
          <h3 class="text-sm font-700 text-gray-900 mb-1">
            Component Failed to Load
          </h3>
          <p class="text-xs text-gray-500 max-w-sm">
            Something went wrong while rendering this section. Please refresh
            the page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
