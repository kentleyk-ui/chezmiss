"use client";

import React, { ReactNode, ReactElement } from "react";
import { AlertCircle } from "lucide-react";
import { LiquidMetalButton } from "@/ui-lib/components/liquid-metal-button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
  onError?: (error: Error) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    this.props.onError?.(error);
    console.error("Error boundary caught:", error);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        this.props.fallback?.(this.state.error, this.handleRetry) || (
          <div className="min-h-screen bg-black text-[#f0c9e1] flex items-center justify-center p-6">
            <div className="max-w-md rounded-xl border border-red-600/30 bg-red-900/10 p-8 text-center">
              <AlertCircle size={48} className="mx-auto mb-4 text-red-400" />
              <h2 className="text-xl font-semibold mb-2">Une erreur s'est produite</h2>
              <p className="text-sm text-[#f0c9e1]/70 mb-6 font-mono">
                {this.state.error.message}
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => window.location.href = "/"}
                  className="px-4 py-2 bg-[#B79A5B]/20 hover:bg-[#B79A5B]/30 rounded transition text-sm"
                >
                  Retour à l'accueil
                </button>
                <button
                  onClick={this.handleRetry}
                  className="px-4 py-2 bg-[#B79A5B]/20 hover:bg-[#B79A5B]/30 rounded transition text-sm"
                >
                  Réessayer
                </button>
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
