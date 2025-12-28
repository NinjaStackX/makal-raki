// components/GlobalErrorBoundary.tsx
"use client";

import { showError } from "@/lib/error";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export class GlobalErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    showError(error);
  }

  render() {
    return <>{this.props.children}</>;
  }
}
