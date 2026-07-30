import { Suspense, useEffect, useRef, useState } from "react";

const LazySection = ({
  children,
  fallback,
  minHeight = "300px",
  rootMargin = "300px 0px",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin }
    );

    const element = sectionRef.current;

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) observer.unobserve(element);
      observer.disconnect();
    };
  }, [rootMargin]);

  return (
    <div ref={sectionRef}>
      {isVisible ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback ?? <div style={{ minHeight }} />
      )}
    </div>
  );
};

export default LazySection;