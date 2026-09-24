import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Hook to trigger entrance animation when an element scrolls into view
 * @param {Object} options IntersectionObserver options
 * @returns {[React.RefObject, boolean]} [ref, isVisible]
 */
export function useScrollReveal(options = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }) {
  const [isVisible, setIsVisible] = useState(() => {
    return typeof IntersectionObserver === 'undefined';
  });
  const ref = useRef(null);

  useEffect(() => {
    const target = ref.current;
    if (!target || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [options]);

  return [ref, isVisible];
}

/**
 * Hook to track global window scroll progress percentage (0 - 100)
 * Optimized with requestAnimationFrame for 60fps performance
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight > 0) {
        const currentProgress = (scrollTop / scrollHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

/**
 * Hook to compute continuous scroll progress (0 to 1) for a specific element
 * while it is traversing through the viewport.
 * Perfect for scroll-linked scaling, parallax shifting, and zoom transitions.
 */
export function useElementScrollTransform() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const calculateProgress = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Check if element is currently within or near the viewport
    const visible = rect.bottom >= 0 && rect.top <= windowHeight;
    setIsVisible(visible);

    if (visible) {
      // Progress from 0 (when top of element hits bottom of screen)
      // to 1 (when bottom of element leaves top of screen)
      const totalDistance = windowHeight + rect.height;
      const currentPos = windowHeight - rect.top;
      const rawProgress = currentPos / totalDistance;
      const clamped = Math.min(1, Math.max(0, rawProgress));
      setProgress(clamped);
    }
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    calculateProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [calculateProgress]);

  return { ref, progress, isVisible };
}
