import { useEffect, useRef, useState, useCallback } from "react";

interface UseInfiniteScrollProps {
  loadMore: () => Promise<void>;
  hasMore: boolean;
  threshold?: number;
}

export default function useInfiniteScroll({ 
  loadMore, 
  hasMore, 
  threshold = 100 
}: UseInfiniteScrollProps) {
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const handleLoadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    await loadMore();
    setLoading(false);
  }, [loadMore, hasMore, loading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          handleLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: `${threshold}px` }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, handleLoadMore, threshold]);

  return { loaderRef, loading };
}