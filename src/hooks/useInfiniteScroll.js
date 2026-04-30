import { useEffect } from "react";

export function useInfiniteScroll({ targetRef, enabled, onLoadMore, rootMargin = "280px" }) {
  useEffect(() => {
    const target = targetRef.current;

    if (!target || !enabled) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [targetRef, enabled, onLoadMore, rootMargin]);
}
