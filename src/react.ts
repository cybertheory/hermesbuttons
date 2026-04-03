'use client';

import {
  useRef,
  useEffect,
  createElement,
  type FC,
} from 'react';
import type { HermesButtonOptions, HermesSkillButtonOptions } from './types';

export type { HermesButtonOptions, HermesSkillButtonOptions };

export interface HermesButtonProps extends HermesButtonOptions {
  className?: string;
  style?: React.CSSProperties;
  /** Fired when command is copied. Also available via onCopy prop. */
  onHbCopy?: (e: CustomEvent<{ command: string }>) => void;
  onHbOpen?: (e: CustomEvent<{ command: string; fullCommand: string }>) => void;
  onHbClose?: (e: CustomEvent) => void;
}

export interface HermesSkillButtonProps extends HermesSkillButtonOptions {
  className?: string;
  style?: React.CSSProperties;
  onHbCopy?: (e: CustomEvent<{ command: string }>) => void;
  onHbOpen?: (e: CustomEvent<{ command: string }>) => void;
  onHbClose?: (e: CustomEvent) => void;
}

export const HermesButton: FC<HermesButtonProps> = ({
  command,
  theme = 'branded',
  size = 'md',
  variant = 'filled',
  shape = 'rounded',
  popup = true,
  promptFlag = true,
  onCopy,
  popupTitle,
  popupDescription,
  className,
  style,
  onHbCopy,
  onHbOpen,
  onHbClose,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elRef = useRef<HTMLElement | null>(null);

  const hbCopyRef = useRef(onHbCopy);
  hbCopyRef.current = onHbCopy;
  const hbOpenRef = useRef(onHbOpen);
  hbOpenRef.current = onHbOpen;
  const hbCloseRef = useRef(onHbClose);
  hbCloseRef.current = onHbClose;

  useEffect(() => {
    if (!containerRef.current) return;

    import('./hermes-button').then(() => {
      if (!containerRef.current || elRef.current) return;

      const el = document.createElement('hermes-button');
      elRef.current = el;

      el.addEventListener('hb-copy', ((e: Event) => hbCopyRef.current?.(e as CustomEvent)) as EventListener);
      el.addEventListener('hb-open', ((e: Event) => hbOpenRef.current?.(e as CustomEvent)) as EventListener);
      el.addEventListener('hb-close', ((e: Event) => hbCloseRef.current?.(e as CustomEvent)) as EventListener);

      containerRef.current.appendChild(el);
    });

    return () => {
      const el = elRef.current;
      const container = containerRef.current;
      if (el && container?.contains(el)) {
        container.removeChild(el);
      }
      elRef.current = null;
    };
  }, []);

  useEffect(() => {
    const el = elRef.current;
    if (!el || !('options' in el)) return;

    (el as any).options = {
      command,
      theme,
      size,
      variant,
      shape,
      popup,
      promptFlag,
      onCopy,
      popupTitle,
      popupDescription,
    };
  }, [command, theme, size, variant, shape, popup, promptFlag, onCopy, popupTitle, popupDescription]);

  return createElement('div', {
    ref: containerRef,
    className,
    style: { display: 'inline-block', ...style },
    suppressHydrationWarning: true,
  });
};

export const HermesSkillButton: FC<HermesSkillButtonProps> = ({
  command,
  theme = 'branded',
  size = 'md',
  variant = 'filled',
  shape = 'rounded',
  popup = true,
  onCopy,
  popupTitle,
  popupDescription,
  className,
  style,
  onHbCopy,
  onHbOpen,
  onHbClose,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elRef = useRef<HTMLElement | null>(null);

  const hbCopyRef = useRef(onHbCopy);
  hbCopyRef.current = onHbCopy;
  const hbOpenRef = useRef(onHbOpen);
  hbOpenRef.current = onHbOpen;
  const hbCloseRef = useRef(onHbClose);
  hbCloseRef.current = onHbClose;

  useEffect(() => {
    if (!containerRef.current) return;

    import('./hermes-skill-button').then(() => {
      if (!containerRef.current || elRef.current) return;

      const el = document.createElement('hermes-skill-button');
      elRef.current = el;

      el.addEventListener('hb-copy', ((e: Event) => hbCopyRef.current?.(e as CustomEvent)) as EventListener);
      el.addEventListener('hb-open', ((e: Event) => hbOpenRef.current?.(e as CustomEvent)) as EventListener);
      el.addEventListener('hb-close', ((e: Event) => hbCloseRef.current?.(e as CustomEvent)) as EventListener);

      containerRef.current.appendChild(el);
    });

    return () => {
      const el = elRef.current;
      const container = containerRef.current;
      if (el && container?.contains(el)) {
        container.removeChild(el);
      }
      elRef.current = null;
    };
  }, []);

  useEffect(() => {
    const el = elRef.current;
    if (!el || !('options' in el)) return;

    (el as any).options = {
      command,
      theme,
      size,
      variant,
      shape,
      popup,
      onCopy,
      popupTitle,
      popupDescription,
    };
  }, [command, theme, size, variant, shape, popup, onCopy, popupTitle, popupDescription]);

  return createElement('div', {
    ref: containerRef,
    className,
    style: { display: 'inline-block', ...style },
    suppressHydrationWarning: true,
  });
};
