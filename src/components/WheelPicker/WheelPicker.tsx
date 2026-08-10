import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useImperativeHandle,
  memo,
} from 'react';
import { cn } from '@/utils/cn';
import styles from './WheelPicker.module.css';
import type {
  WheelPickerProps,
  WheelPickerRef,
  WheelItem,
  ItemTransform,
} from './types';
import {
  DEFAULT_ITEM_HEIGHT,
  DEFAULT_VISIBLE_ITEMS,
  DEFAULT_RADIUS,
  DEFAULT_PERSPECTIVE,
} from './types';
import { useWheelPhysics } from './hooks/useWheelPhysics';
import { useWheelEvents } from './hooks/useWheelEvents';
import {
  calculateWheelConfig,
  getAnglePerItem,
  calculateItemTransform,
  getInfiniteIndex,
  getVisibleIndices,
} from './utils/wheelMath';

const WheelItemComponent = memo(function WheelItemComponent({
  item,
  transform,
  isSelected,
  onClick,
}: {
  item: WheelItem;
  transform: ItemTransform;
  isSelected: boolean;
  onClick: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);

  const itemStyle: React.CSSProperties = useMemo(() => ({
    transform: `
      rotateX(${transform.rotateX}deg)
      translateZ(${transform.translateZ}px)
      translateY(${transform.translateY}px)
      scale(${transform.scale})
    `,
    opacity: transform.opacity,
    filter: transform.filter,
    zIndex: transform.zIndex,
    pointerEvents: transform.opacity > 0.05 ? 'auto' : 'none',
  }), [transform]);

  return (
    <div
      ref={itemRef}
      className={cn(
        styles.wheelItem,
        isSelected && styles.wheelItemCenter,
        item.disabled && styles.wheelItemDisabled
      )}
      style={itemStyle}
      onClick={onClick}
      role="option"
      aria-selected={isSelected}
      aria-disabled={item.disabled}
      tabIndex={isSelected ? 0 : -1}
      data-item-id={String(item.id)}
    >
      <div className={styles.selectionBox} aria-hidden="true" />
      <div className={styles.glowRing} aria-hidden="true" />
      <div className={styles.wheelItemContent}>
        {item.icon && (
          <div className={styles.wheelItemIcon}>
            {item.icon}
          </div>
        )}
        <span className={styles.wheelItemLabel}>{item.label}</span>
        {item.description && (
          <span className={styles.wheelItemDescription}>{item.description}</span>
        )}
      </div>
    </div>
  );
});

WheelItemComponent.displayName = 'WheelItemComponent';

export const WheelPicker = forwardRef<WheelPickerRef, WheelPickerProps>(
  function WheelPicker(
    {
      items,
      value,
      onChange,
      className,
      itemHeight = DEFAULT_ITEM_HEIGHT,
      visibleItems = DEFAULT_VISIBLE_ITEMS,
      radius = DEFAULT_RADIUS,
      perspective = DEFAULT_PERSPECTIVE,
      springConfig,
      autoFocus = false,
      ariaLabel = 'Select an option',
      showValueDisplay = true,
    },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const wheelTrackRef = useRef<HTMLDivElement>(null);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isInteracting, setIsInteracting] = useState(false);

    const config = useMemo(
      () => calculateWheelConfig(itemHeight, radius, visibleItems, perspective, items.length),
      [itemHeight, radius, visibleItems, perspective, items.length]
    );

    const anglePerItem = useMemo(() => getAnglePerItem(config), [config]);

    const findIndexByValue = useCallback(
      (val: unknown): number => {
        return items.findIndex((item) => item.value === val);
      },
      [items]
    );

    useEffect(() => {
      if (value !== undefined) {
        const index = findIndexByValue(value);
        if (index !== -1) {
          setSelectedIndex(index);
        }
      }
    }, [value, findIndexByValue]);

    const {
      state,
      setTargetRotation,
      applyImpulse,
      stop,
      snapToIndex,
    } = useWheelPhysics({
      config: springConfig,
      onAnimationStart: () => setIsInteracting(true),
      onAnimationEnd: () => setIsInteracting(false),
      onSnap: (index) => {
        const clampedIndex = getInfiniteIndex(index, items.length);
        setSelectedIndex(clampedIndex);
        onChange?.(items[clampedIndex].value, items[clampedIndex]);
      },
    });

    // Sync physics rotation when selectedIndex changes
    useEffect(() => {
      const targetRot = selectedIndex * anglePerItem;
      setTargetRotation(targetRot, true);
    }, [selectedIndex, anglePerItem, setTargetRotation]);

    const { rotation, targetRotation, isDragging } = state;

    const handleWheel = useCallback(
      (delta: number) => {
        if (isDragging) return;
        const newTarget = targetRotation + delta;
        setTargetRotation(newTarget);
      },
      [targetRotation, setTargetRotation, isDragging]
    );

    const dragStartRotationRef = useRef(0);

    const handleDragStart = useCallback(
      () => {
        dragStartRotationRef.current = targetRotation;
        stop();
        setIsInteracting(true);
      },
      [targetRotation, stop]
    );

    const handleDragMove = useCallback(
      (y: number) => {
        const delta = (y - dragStartRotationRef.current) * 0.01;
        const newTarget = targetRotation - delta;
        setTargetRotation(newTarget, true);
      },
      [targetRotation, setTargetRotation]
    );

    const handleDragEnd = useCallback(
      (vel: number) => {
        applyImpulse(-vel * 2);
      },
      [applyImpulse]
    );

    const handleKeyDown = useCallback(
      (direction: -1 | 1) => {
        const newIndex = getInfiniteIndex(selectedIndex + direction, items.length);
        snapToIndex(newIndex, items.length, anglePerItem);
      },
      [selectedIndex, items.length, anglePerItem, snapToIndex]
    );

    useWheelEvents({
      containerRef,
      onWheel: handleWheel,
      onDragStart: handleDragStart,
      onDragMove: handleDragMove,
      onDragEnd: handleDragEnd,
      onKeyDown: handleKeyDown,
    });

    useEffect(() => {
      if (wheelTrackRef.current) {
        wheelTrackRef.current.style.setProperty('--wheel-rotation', `${rotation * (180 / Math.PI)}deg`);
        wheelTrackRef.current.style.setProperty('--wheel-perspective', `${perspective}px`);
      }
    }, [rotation, perspective]);

    useEffect(() => {
      if (autoFocus && containerRef.current) {
        containerRef.current.focus();
      }
    }, [autoFocus]);

    const visibleIndices = useMemo(
      () => getVisibleIndices(selectedIndex, items.length, visibleItems + 2),
      [selectedIndex, items.length, visibleItems]
    );

    const itemTransforms = useMemo(() => {
      return visibleIndices.map((idx) => ({
        index: idx,
        transform: calculateItemTransform(idx, rotation, config, selectedIndex),
      }));
    }, [visibleIndices, rotation, config, selectedIndex]);

    const scrollToItem = useCallback(
      (index: number) => {
        const clampedIndex = getInfiniteIndex(index, items.length);
        snapToIndex(clampedIndex, items.length, anglePerItem);
      },
      [items.length, anglePerItem, snapToIndex]
    );

    const scrollToValue = useCallback(
      (val: unknown) => {
        const index = findIndexByValue(val);
        if (index !== -1) {
          scrollToItem(index);
        }
      },
      [findIndexByValue, scrollToItem]
    );

    useImperativeHandle(ref, () => ({
      scrollToItem,
      scrollToValue,
      getSelectedItem: () => items[selectedIndex] || null,
      getSelectedIndex: () => selectedIndex,
    }), [scrollToItem, scrollToValue, items, selectedIndex]);

    const selectedItem = items[selectedIndex];

    return (
      <div
        ref={containerRef}
        className={cn(styles.wheelPicker, className)}
        role="listbox"
        aria-label={ariaLabel}
        tabIndex={0}
        style={{
          '--item-height': `${itemHeight}px`,
          '--accent-rgb': '94, 184, 255',
          '--bg-rgb': '10, 15, 30',
        } as React.CSSProperties}
      >
        <div className={styles.wheelContainer}>
          <div className={styles.fadeOverlay} aria-hidden="true" />
          <div
            ref={wheelTrackRef}
            className={styles.wheelTrack}
            role="presentation"
            style={{
              transformStyle: 'preserve-3d',
            } as React.CSSProperties}
          >
            {itemTransforms.map(({ index, transform }) => {
              const item = items[index];
              const isCenter = index === selectedIndex;

              return (
                <WheelItemComponent
                  key={String(item.id)}
                  item={item}
                  transform={transform}
                  isSelected={isCenter}
                  onClick={() => {
                    if (!item.disabled && index !== selectedIndex) {
                      snapToIndex(index, items.length, anglePerItem);
                    }
                  }}
                />
              );
            })}
          </div>
          <div className={styles.centerIndicator} aria-hidden="true" />
        </div>

        {showValueDisplay && selectedItem && (
          <div
            className={cn(styles.valueDisplay, isInteracting && styles.valueDisplayActive)}
            aria-live="polite"
            aria-atomic="true"
          >
            {selectedItem.label}
          </div>
        )}
      </div>
    );
  }
);

WheelPicker.displayName = 'WheelPicker';

export default WheelPicker;