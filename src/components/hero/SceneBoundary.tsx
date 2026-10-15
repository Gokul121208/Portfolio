"use client";
import { Component, type ReactNode } from "react";

// If the WebGL scene throws, drop it silently: the static gradient and all hero content remain.
export default class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
