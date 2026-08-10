import { useRef, useCallback, useEffect } from 'react';

interface UseWheelEventsOptions {
  containerRef: React.RefObject<HTMLElement | null>;
  onWheel: (delta: number, event: WheelEvent) => void;
  onDragStart: (y: number, event: MouseEvent | TouchEvent) => void;
  onDragMove: (y: number, event: MouseEvent | TouchEvent) => void;
  onDragEnd: (velocity: number, event: MouseEvent | TouchEvent) => void;
  onKeyDown: (direction: -1 | 1, event: KeyboardEvent) => void;
  enabled?: boolean;
  touchSensitivity?: number;
  wheelSensitivity?: number;
  keyboardEnabled?: boolean;
}

export function useWheelEvents({
  containerRef,
  onWheel,
  onDragStart,
  onDragMove,
  onDragEnd,
  onKeyDown,
  enabled = true,
  touchSensitivity = 1,
  wheelSensitivity = 1,
  keyboardEnabled = true,
}: UseWheelEventsOptions) {
  const dragStateRef = useRef<{
    isDragging: boolean;
    startY: number;
    lastY: number;
    lastTime: number;
    velocity: number;
    startRotation: number;
  }>({
    isDragging: false,
    startY: 0,
    lastY: 0,
    lastTime: 0,
    velocity: 0,
    startRotation: 0,
  });

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      if (!enabled) return;
      const target = event.target as HTMLElement;
      if (!containerRef.current?.contains(target)) return;

      event.preventDefault();

      const deltaMode = event.deltaMode;
      const deltaY = event.deltaY;
      const deltaValue =
        deltaMode === WheelEvent.DOM_DELTA_PIXEL
          ? deltaY
          : deltaMode === WheelEvent.DOM_DELTA_LINE
            ? deltaY * 40
            : deltaY * 800;

      onWheel(deltaValue * wheelSensitivity * 0.001, event);
    },
    [containerRef, enabled, onWheel, wheelSensitivity]
  );

  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      if (!enabled) return;
      const target = event.target as HTMLElement;
      if (!containerRef.current?.contains(target)) return;

      const touch = event.touches[0];
      dragStateRef.current = {
        isDragging: true,
        startY: touch.clientY,
        lastY: touch.clientY,
        lastTime: performance.now(),
        velocity: 0,
        startRotation: 0,
      };
      onDragStart(touch.clientY, event);
    },
    [containerRef, enabled, onDragStart]
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (!enabled) return;
      const state = dragStateRef.current;
      if (!state.isDragging) return;

      const touch = event.touches[0];
      const now = performance.now();
      const dt = (now - state.lastTime) / 1000;

      state.velocity = (touch.clientY - state.lastY) / Math.max(dt, 0.001);
      state.lastY = touch.clientY;
      state.lastTime = now;

      onDragMove(touch.clientY, event);
    },
    [enabled, onDragMove]
  );

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      if (!enabled) return;
      const state = dragStateRef.current;
      if (!state.isDragging) return;

      state.isDragging = false;
      onDragEnd(state.velocity * touchSensitivity * 0.001, event);
    },
    [enabled, onDragEnd, touchSensitivity]
  );

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      if (!enabled) return;
      const target = event.target as HTMLElement;
      if (!containerRef.current?.contains(target)) return;
      if (event.button !== 0) return;

      event.preventDefault();
      dragStateRef.current = {
        isDragging: true,
        startY: event.clientY,
        lastY: event.clientY,
        lastTime: performance.now(),
        velocity: 0,
        startRotation: 0,
      };
      onDragStart(event.clientY, event);

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const dragState = dragStateRef.current;
        if (!dragState.isDragging) return;

        const now = performance.now();
        const dt = (now - dragState.lastTime) / 1000;

        dragState.velocity = (moveEvent.clientY - dragState.lastY) / Math.max(dt, 0.001);
        dragState.lastY = moveEvent.clientY;
        dragState.lastTime = now;

        onDragMove(moveEvent.clientY, moveEvent);
      };

      const handleMouseUp = (upEvent: MouseEvent) => {
        const dragState = dragStateRef.current;
        if (!dragState.isDragging) return;

        dragState.isDragging = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mouseleave', handleMouseUp);
        onDragEnd(dragState.velocity * 0.001, upEvent);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseleave', handleMouseUp);
    },
    [containerRef, enabled, onDragStart, onDragMove, onDragEnd]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled || !keyboardEnabled) return;
      const target = event.target as HTMLElement;
      if (!containerRef.current?.contains(target)) return;

      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        const direction = event.key === 'ArrowUp' ? -1 : 1;
        onKeyDown(direction, event);
      }
    },
    [containerRef, enabled, keyboardEnabled, onKeyDown]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    containerRef,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleKeyDown,
  ]);
}