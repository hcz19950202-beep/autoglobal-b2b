import { useState, useEffect, useRef } from 'react';

const useCountUp = (endValue, duration = 2000) => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Extract number from string (e.g., '10,000+' -> 10000)
    const numericEnd = parseInt(String(endValue).replace(/[^0-9]/g, ''), 10);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const currentCount = Math.floor(progress * numericEnd);
          
          setValue(currentCount);
          
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            setValue(endValue); // Set final value with suffix/formatting
          }
        };
        window.requestAnimationFrame(step);
      }
    }, { threshold: 0.1 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [endValue, duration]);

  return { ref, value };
};

export default useCountUp;
