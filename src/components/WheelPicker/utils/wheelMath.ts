import type { ItemTransform } from '../types';
import { DEFAULT_ITEM_HEIGHT, DEFAULT_RADIUS, DEFAULT_VISIBLE_ITEMS } from '../types';

export interface WheelMathConfig {
  itemHeight: number;
  radius: number;
  visibleItems: number;
  perspective: number;
  itemCount: number;
}

export function calculateWheelConfig(
  itemHeight: number = DEFAULT_ITEM_HEIGHT,
  radius: number = DEFAULT_RADIUS,
  visibleItems: number = DEFAULT_VISIBLE_ITEMS,
  perspective: number = 1000,
  itemCount: number
): WheelMathConfig {
  return {
    itemHeight,
    radius,
    visibleItems,
    perspective,
    itemCount,
  };
}

export function getAnglePerItem(config: WheelMathConfig): number {
  return (360 / config.itemCount) * (Math.PI / 180);
}

export function getItemAngle(index: number, rotation: number, config: WheelMathConfig): number {
  const anglePerItem = getAnglePerItem(config);
  return index * anglePerItem - rotation;
}

export function normalizeAngle(angle: number): number {
  const twoPI = Math.PI * 2;
  return ((angle % twoPI) + twoPI) % twoPI;
}

export function getShortestRotation(current: number, target: number): number {
  const diff = normalizeAngle(target - current);
  return diff > Math.PI ? diff - Math.PI * 2 : diff;
}

export function calculateItemTransform(
  index: number,
  rotation: number,
  config: WheelMathConfig,
  centerIndex: number
): ItemTransform {
  const anglePerItem = getAnglePerItem(config);
  const relativeIndex = index - centerIndex;
  const rawAngle = relativeIndex * anglePerItem - rotation;
  const angle = normalizeAngle(rawAngle + Math.PI) - Math.PI;

  const isCenter = Math.abs(relativeIndex) === 0 && Math.abs(rotation) < anglePerItem / 2;
  const distanceFromCenter = Math.abs(angle);

  const halfVisibleAngle = (config.visibleItems / 2) * anglePerItem;

  const rotateX = angle * (180 / Math.PI);
  const translateZ = config.radius * (1 - Math.cos(angle));
  const translateY = config.radius * Math.sin(angle);
  const zIndex = 100 - Math.floor(distanceFromCenter / anglePerItem);

  let scale: number;
  let opacity: number;
  let blur: number;

  if (distanceFromCenter > halfVisibleAngle) {
    opacity = 0;
    scale = 0.3;
    blur = 8;
  } else {
    const progress = distanceFromCenter / halfVisibleAngle;
    scale = 1 - progress * 0.35;
    opacity = 1 - progress * 0.7;
    blur = progress * 4;
  }

  if (isCenter) {
    scale = 1.15;
    opacity = 1;
    blur = 0;
  }

  return {
    rotateX: -rotateX,
    translateZ,
    translateY: -translateY,
    scale,
    opacity,
    filter: `blur(${blur}px)`,
    zIndex: isCenter ? 200 : zIndex,
    isCenter,
  };
}

export function getCenterIndex(rotation: number, config: WheelMathConfig): number {
  const anglePerItem = getAnglePerItem(config);
  let index = Math.round(rotation / anglePerItem);
  index = ((index % config.itemCount) + config.itemCount) % config.itemCount;
  return index;
}

export function getTargetRotationForIndex(index: number, config: WheelMathConfig): number {
  const anglePerItem = getAnglePerItem(config);
  return index * anglePerItem;
}

export function getInfiniteIndex(index: number, itemCount: number): number {
  return ((index % itemCount) + itemCount) % itemCount;
}

export function getVisibleIndices(centerIndex: number, itemCount: number, visibleCount: number): number[] {
  const half = Math.floor(visibleCount / 2);
  const indices: number[] = [];
  for (let i = -half; i <= half; i++) {
    indices.push(getInfiniteIndex(centerIndex + i, itemCount));
  }
  return indices;
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}