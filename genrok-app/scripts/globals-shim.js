/**
 * Globals Shim for Lesson Components Bundle
 *
 * This shim maps CDN-loaded globals to module imports expected by components.
 * Must be loaded AFTER the CDN scripts (React, ReactDOM, framer-motion)
 */

// React globals (loaded from CDN as window.React, window.ReactDOM)
export const React = window.React;
export const { useState, useEffect, useCallback, useMemo, useRef } = window.React;

// Framer Motion (loaded from CDN as window.Motion)
export const motion = window.Motion?.motion;
export const AnimatePresence = window.Motion?.AnimatePresence;
