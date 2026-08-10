import { useRef, useCallback, useEffect, useMemo, useState } from 'react';
import type { SpringConfig, WheelPhysicsState } from '../types';
import { DEFAULT_SPRING_CONFIG } from '../types';

interface UseWheelPhysicsOptions {
  config?: Partial<SpringConfig>;
  onAnimationStart?: () => void;
  onAnimationEnd?: (finalRotation: number) => void;
  onSnap?: (index: number) => void;
}

interface UseWheelPhysicsReturn {
  state: WheelPhysicsState;
  setTargetRotation: (rotation: number, immediate?: boolean) => void;
  applyImpulse: (velocity: number) => void;
  stop: () => void;
  snapToIndex: (index: number, _itemCount: number, anglePerItem: number) => void;
}

/* eslint-disable react-hooks/refs */
export function useWheelPhysics({
  config = {},
  onAnimationStart,
  onAnimationEnd,
  onSnap,
}: UseWheelPhysicsOptions = {}): UseWheelPhysicsReturn {
  const springConfig = useMemo(
    () => ({ ...DEFAULT_SPRING_CONFIG, ...config }),
    [config]
  );

  const [, forceUpdate] = useState(0);

  const stateRef = useRef<WheelPhysicsState>({
    rotation: 0,
    velocity: 0,
    targetRotation: 0,
    isAnimating: false,
    isDragging: false,
  });

  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const snapCallbackRef = useRef<(index: number) => void>(() => {});
  const onAnimationStartRef = useRef(onAnimationStart);
  const onAnimationEndRef = useRef(onAnimationEnd);
  const updatePhysicsRef = useRef<(currentTime: number) => void | undefined>(undefined);

  useEffect(() => {
    onAnimationStartRef.current = onAnimationStart;
  }, [onAnimationStart]);

  useEffect(() => {
    onAnimationEndRef.current = onAnimationEnd;
  }, [onAnimationEnd]);

  useEffect(() => {
    snapCallbackRef.current = onSnap || (() => {});
  }, [onSnap]);

  const scheduleUpdate = useCallback(() => {
    forceUpdate((n) => n + 1);
  }, []);

  // Define the physics update function using a ref to avoid circular dependency
  const updatePhysics = useCallback((currentTime: number) => {
    const state = stateRef.current;
    const dt = Math.min((currentTime - lastTimeRef.current) / 1000, 1 / 30);
    lastTimeRef.current = currentTime;

    if (state.isDragging) {
      if (updatePhysicsRef.current) {
        animationRef.current = requestAnimationFrame(updatePhysicsRef.current);
      }
      return;
    }

    const { stiffness, damping, mass, precision = 0.001 } = springConfig;
    const displacement = state.targetRotation - state.rotation;

    const springForce = displacement * stiffness;
    const dampingForce = -state.velocity * damping;
    const acceleration = (springForce + dampingForce) / mass;

    state.velocity += acceleration * dt;
    state.rotation += state.velocity * dt;

    const isAtRest =
      Math.abs(state.velocity) < precision && Math.abs(displacement) < precision;

    if (isAtRest) {
      state.rotation = state.targetRotation;
      state.velocity = 0;
      state.isAnimating = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      onAnimationEndRef.current?.(state.rotation);
      scheduleUpdate();
    } else {
      state.isAnimating = true;
      if (updatePhysicsRef.current) {
        animationRef.current = requestAnimationFrame(updatePhysicsRef.current);
      }
      scheduleUpdate();
    }
  }, [springConfig, scheduleUpdate]);

  // Store the callback in a ref for stable reference
  updatePhysicsRef.current = updatePhysics;

  const setTargetRotation = useCallback(
    (rotation: number, immediate = false) => {
      const state = stateRef.current;
      state.targetRotation = rotation;

      if (immediate) {
        state.rotation = rotation;
        state.velocity = 0;
        state.isAnimating = false;
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
        scheduleUpdate();
      } else if (!state.isAnimating && !state.isDragging) {
        state.isAnimating = true;
        lastTimeRef.current = performance.now();
        onAnimationStartRef.current?.();
        if (updatePhysicsRef.current) {
          animationRef.current = requestAnimationFrame(updatePhysicsRef.current);
        }
      }
    },
    [scheduleUpdate]
  );

  const applyImpulse = useCallback((velocity: number) => {
    const state = stateRef.current;
    if (state.isDragging) return;
    state.velocity += velocity;
    state.targetRotation = state.rotation;
    if (!state.isAnimating) {
      state.isAnimating = true;
      lastTimeRef.current = performance.now();
      onAnimationStartRef.current?.();
      if (updatePhysicsRef.current) {
        animationRef.current = requestAnimationFrame(updatePhysicsRef.current);
      }
    }
  }, []);

  const stop = useCallback(() => {
    const state = stateRef.current;
    state.velocity = 0;
    state.targetRotation = state.rotation;
    state.isAnimating = false;
    state.isDragging = false;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    scheduleUpdate();
  }, [scheduleUpdate]);

  const snapToIndex = useCallback(
    (index: number, _itemCount: number, anglePerItem: number) => {
      const state = stateRef.current;
      const targetRotation = index * anglePerItem;

      const diff = targetRotation - state.rotation;
      const normalizedDiff = ((diff + Math.PI) % (Math.PI * 2)) - Math.PI;

      state.targetRotation = state.rotation + normalizedDiff;
      snapCallbackRef.current(index);

      if (!state.isAnimating && !state.isDragging) {
        state.isAnimating = true;
        lastTimeRef.current = performance.now();
        onAnimationStartRef.current?.();
        if (updatePhysicsRef.current) {
          animationRef.current = requestAnimationFrame(updatePhysicsRef.current);
        }
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Create a stable return object that reads from the ref
  const returnValue = {
    state: stateRef.current,
    setTargetRotation,
    applyImpulse,
    stop,
    snapToIndex,
  };

  return returnValue;
}
/* eslint-enable react-hooks/refs */