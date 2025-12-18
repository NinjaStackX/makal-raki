// components/GlobalErrorBoundary.tsx
"use client";

import { showError } from "@/lib/error";
import { Component, ReactNode } from "react";

export class GlobalErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    showError(error);
  }

  render() {
    return <>{this.props.children}</>;
  }
}
