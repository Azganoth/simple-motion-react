import { useEffect, useRef, useState } from "react";

export const StoryWrapper = ({ children }: { children: any }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;

        setDimensions((prevDimensions) => ({
          width: Math.max(prevDimensions.width, width),
          height: Math.max(prevDimensions.height, height),
        }));
      }
    });

    resizeObserver.observe(wrapper);
    return () => resizeObserver.disconnect();
  }, [wrapperRef.current]);

  return (
    <div
      ref={wrapperRef}
      className="story-wrapper"
      style={{
        minWidth: `${dimensions.width}px`,
        minHeight: `${dimensions.height}px`,
      }}
    >
      {children}
    </div>
  );
};

export const formatCode = (code: string) => {
  const indent = Math.max(code.search(/\S|$/), 1) - 1;
  return (
    "/* Unrelated styles omitted */\n" +
    code.trim().replace(new RegExp(`^[ ]{1,${indent}}`, "gm"), "")
  );
};
