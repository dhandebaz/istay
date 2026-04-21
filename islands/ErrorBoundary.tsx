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
        <div class="p-8 rounded-3xl border border-gray-100 bg-white shadow-sm flex flex-col items-center justify-center text-center">
          <div class="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center mb-6 rotate-3">
            <span class="text-3xl">🧩</span>
          </div>
          <h3 class="text-lg font-900 text-gray-900 mb-2">
            Something went wrong
          </h3>
          <p class="text-sm text-gray-500 max-w-xs mb-8 font-500">
            This section failed to load. We've been notified and are looking into it.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
            <button
              onClick={() => globalThis.location?.reload()}
              class="flex-1 px-6 py-3 rounded-xl bg-istay-900 text-white text-sm font-800 hover:bg-istay-800 active:scale-95 transition-all shadow-lg shadow-istay-900/10"
            >
              Refresh Page
            </button>
            <button
              onClick={() => this.setState({ hasError: false })}
              class="flex-1 px-6 py-3 rounded-xl bg-gray-50 text-gray-600 text-sm font-700 hover:bg-gray-100 transition-all"
            >
              Try Again
            </button>
          </div>

          {/* Technical Details (Hidden for non-devs) */}
          {this.state.error && (
            <details class="mt-8 w-full text-left">
              <summary class="text-[10px] font-800 text-gray-300 uppercase tracking-widest cursor-pointer hover:text-gray-400 transition-colors list-none text-center">
                Technical Details
              </summary>
              <div class="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 font-mono text-[10px] leading-relaxed text-gray-500 overflow-auto max-h-48">
                <p class="text-rose-500 font-700 mb-1">Error: {this.state.error.message}</p>
                <pre class="opacity-60">{this.state.error.stack}</pre>
              </div>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
