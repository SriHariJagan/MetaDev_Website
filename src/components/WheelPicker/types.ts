export interface WheelItem<T = unknown> {
  id: string | number;
  label: string;
  value: T;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
}

export interface WheelPickerProps<T = unknown> {
  items: WheelItem<T>[];
  value?: T;
  onChange?: (value: T, item: WheelItem<T>) => void;
  className?: string;
  itemHeight?: number;
  visibleItems?: number;
  radius?: number;
  perspective?: number;
  springConfig?: SpringConfig;
  enableHaptics?: boolean;
  autoFocus?: boolean;
  ariaLabel?: string;
  showValueDisplay?: boolean;
}

export interface SpringConfig {
  stiffness: number;
  damping: number;
  mass: number;
  precision?: number;
}

export interface WheelPhysicsState {
  rotation: number;
  velocity: number;
  targetRotation: number;
  isAnimating: boolean;
  isDragging: boolean;
}

export interface ItemTransform {
  rotateX: number;
  translateZ: number;
  translateY: number;
  scale: number;
  opacity: number;
  filter: string;
  zIndex: number;
  isCenter: boolean;
}

export interface WheelPickerRef {
  scrollToItem: (index: number) => void;
  scrollToValue: (value: unknown) => void;
  getSelectedItem: () => WheelItem<unknown> | null;
  getSelectedIndex: () => number;
}

export type WheelItemComponentProps = {
  item: WheelItem;
  transform: ItemTransform;
  isSelected: boolean;
  index: number;
  onClick: () => void;
};

export const DEFAULT_SPRING_CONFIG: SpringConfig = {
  stiffness: 0.15,
  damping: 0.85,
  mass: 1,
  precision: 0.001,
};

export const DEFAULT_ITEM_HEIGHT = 64;
export const DEFAULT_VISIBLE_ITEMS = 7;
export const DEFAULT_RADIUS = 280;
export const DEFAULT_PERSPECTIVE = 1000;