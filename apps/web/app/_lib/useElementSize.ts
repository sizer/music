import { useRef, useLayoutEffect, useState, RefObject, useMemo } from 'react';

// https://codesandbox.io/p/sandbox/useelementsize-7mx5e?file=%2Fsrc%2Fuse-element-size.ts%3A22%2C11

// ugh, this is "making typescript happy" pain
interface SubscribeToSizeChanges {
    (el: HTMLElement, resizeCallback: Function): () => void;
    observerSingleton?: ResizeObserver;
    callbacks: Map<HTMLElement, Function>;
}

// This is a whole lot of hullabaloo to ensure there is only
// ever 1 ResizeObserver created, but that may be a huge waste
// of time for all I know. Not sure which is more performant
// a ResizeObserver for each element, or a hulaballo like this
const subscribe: SubscribeToSizeChanges = Object.assign(
    (el: HTMLElement, resizeCallback: Function) => {
        subscribe.callbacks.set(el, resizeCallback);
        if (!subscribe.observerSingleton) {
            subscribe.observerSingleton = new ResizeObserver((entries) => {
                const callbacksEntries = [...subscribe.callbacks];
                callbacksEntries.forEach(([el, cb]) =>
                    cb(entries.filter(({ target }) => target === el))
                );
            });
        }
        subscribe.observerSingleton.observe(el);
        return () => {
            subscribe.observerSingleton?.unobserve(el);
            subscribe.callbacks.delete(el);
        };
    },
    {
        callbacks: new Map(),
        observerSingleton: undefined
    }
);

export const useElementSize = <T extends HTMLElement>(ref?: RefObject<T>) => {
    const elRef = useRef<T>(null);
    const [{ height, width }, setSize] = useState<{
        height?: number;
        width?: number;
    }>(() => ({
        width: undefined, // so they can set default values
        height: undefined // in the consuming component
    }));

    useLayoutEffect(() => {
        const element = elRef.current || ref?.current;
        if (element) {
            const unsub = subscribe(element, (entries: any) => {
                entries.forEach(
                    ({ contentRect: { height, width } }: ResizeObserverEntry) => {
                        setSize({ height, width });
                    }
                );
            });
            return () => unsub();
        }
    }, [ref]);

    return useMemo(() => ({ height, width, ref: elRef }), [height, width]);
};
