import { useCallback, useMemo } from "react";
import { useLightInteractionOptional } from "@/components/providers/LightInteractionProvider";

export interface LightReactiveHandlers {
  onPointerEnter: (e: React.PointerEvent<HTMLElement>) => void;
  onPointerMove: (e: React.PointerEvent<HTMLElement>) => void;
  onPointerLeave: (e: React.PointerEvent<HTMLElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLElement>) => void;
}

const EMPTY_HANDLERS: Record<string, never> = {};

/**
 * Binds pointer handlers so the background light focuses on the element center while hovered.
 */
export function useLightReactiveHandlers(
  strength = 1
): Partial<LightReactiveHandlers> {
  const ctx = useLightInteractionOptional();

  const onPointerEnter = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      ctx?.setHoverFromElement(e.currentTarget, strength);
    },
    [ctx, strength]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!ctx) return;
      ctx.setHoverFromElement(e.currentTarget, strength);
    },
    [ctx, strength]
  );

  const onPointerLeave = useCallback(
    (_e: React.PointerEvent<HTMLElement>) => {
      ctx?.clearHover();
    },
    [ctx]
  );

  const onFocus = useCallback(
    (e: React.FocusEvent<HTMLElement>) => {
      ctx?.setHoverFromElement(e.currentTarget, strength * 0.88);
    },
    [ctx, strength]
  );

  const onBlur = useCallback(
    (_e: React.FocusEvent<HTMLElement>) => {
      ctx?.clearHover();
    },
    [ctx]
  );

  return useMemo(() => {
    if (!ctx) return EMPTY_HANDLERS;
    return {
      onPointerEnter,
      onPointerMove,
      onPointerLeave,
      onFocus,
      onBlur,
    };
  }, [ctx, onPointerEnter, onPointerMove, onPointerLeave, onFocus, onBlur]);
}
