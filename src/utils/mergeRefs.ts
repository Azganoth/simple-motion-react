import type { MutableRefObject, RefCallback } from "react";

const mergeRefs =
  <T>(
    ...refs: (RefCallback<T> | MutableRefObject<T | null> | null | undefined)[]
  ): RefCallback<T> =>
  (instance) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(instance);
      } else if (ref != null) {
        ref.current = instance;
      }
    });
  };

export default mergeRefs;
