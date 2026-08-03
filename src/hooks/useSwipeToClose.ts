'use client';

import { useEffect, type RefObject } from 'react';

const SWIPE_THRESHOLD = 60;

export function useSwipeToClose(ref: RefObject<HTMLElement | null>, direction: 'left' | 'right', onClose: () => void) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let startX = 0;
        let startY = 0;
        let tracking = false;

        const onTouchStart = (e: TouchEvent) => {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            tracking = true;
        };

        const onTouchMove = (e: TouchEvent) => {
            if (!tracking) return;
            const touch = e.touches[0];
            if (Math.abs(touch.clientY - startY) > Math.abs(touch.clientX - startX)) {
                tracking = false;
            }
        };

        const onTouchEnd = (e: TouchEvent) => {
            if (!tracking) return;
            tracking = false;
            const dx = e.changedTouches[0].clientX - startX;
            if (direction === 'left' && dx < -SWIPE_THRESHOLD) onClose();
            if (direction === 'right' && dx > SWIPE_THRESHOLD) onClose();
        };

        el.addEventListener('touchstart', onTouchStart, { passive: true });
        el.addEventListener('touchmove', onTouchMove, { passive: true });
        el.addEventListener('touchend', onTouchEnd, { passive: true });

        return () => {
            el.removeEventListener('touchstart', onTouchStart);
            el.removeEventListener('touchmove', onTouchMove);
            el.removeEventListener('touchend', onTouchEnd);
        };
    }, [ref, direction, onClose]);
}
