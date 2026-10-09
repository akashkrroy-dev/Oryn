'use client';

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const CURSOR_STATES = {
   default: {
      ring: 1, dotX: 1, dotY: 1,
      dotColor: "oklch(55.6% 0.197 10.7)",
      ringColor: "oklch(89.8% 0 0)",
      ringFill: "transparent",
      blend: "normal",
   },
   link: {
      ring: 1.8, dotX: 0.5, dotY: 0.5,          
      dotColor: "oklch(100% 0 0)",              
      ringColor: "oklch(55.6% 0.197 10.7)",  
      ringFill: "transparent",
      blend: "normal",
   },
   button: {
      ring: 1.5, dotX: 0, dotY: 0, 
      dotColor: "oklch(100% 0 0)",
      ringColor: "transparent",
      ringFill: "oklch(100% 0 0)", 
      blend: "difference",
   },
   card: {
      ring: 3, dotX: 0, dotY: 0,
      dotColor: "oklch(55.6% 0.197 10.7)",
      ringColor: "oklch(100% 0 0 / 0.3)",
      ringFill: "oklch(100% 0 0 / 0.05)",
      blend: "normal",
   },
};

type CursorState = keyof typeof CURSOR_STATES;

const CLICK_MULTIPLIER = 0.8;
const HOVER_SELECTOR = "[data-cursor], a, button";

export default function useCursor() {
   const cursorRef = useRef<HTMLDivElement>(null);
   const outherRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const dot = cursorRef.current;
      const ring = outherRef.current;
      if (!dot || !ring) return;

      gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0, scale: 1 });

      const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
      const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
      const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
      const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

      let visible = false;
      let isClicking = false;
      let current: CursorState = "default";

      const getState = (target: Element | null): CursorState => {
         const el = target?.closest(HOVER_SELECTOR);
         if (!el) return "default";

         const custom = el.getAttribute("data-cursor");
         if (custom && custom in CURSOR_STATES) return custom as CursorState;

         if (el.tagName === "A") return "link";
         if (el.tagName === "BUTTON") return "button";
         return "default";
      };

      const update = () => {
         const state = CURSOR_STATES[current];
         const ringScale = state.ring * (isClicking ? CLICK_MULTIPLIER : 1);

         gsap.to(ring, { scale: ringScale, duration: 0.3, ease: "power3.out", overwrite: "auto" });
         gsap.to(dot, {
            scaleX: state.dotX,
            scaleY: state.dotY,
            duration: 0.3,
            ease: "power3.out",
            overwrite: "auto",
         });

         dot.style.backgroundColor = state.dotColor;
         ring.style.borderColor = state.ringColor;
         ring.style.backgroundColor = state.ringFill;
         ring.style.mixBlendMode = state.blend;

         ring.dataset.state = current;
      };

      update();

      const show = () => {
         if (visible) return;
         visible = true;
         gsap.to([dot, ring], { opacity: 1, duration: 0.1, overwrite: "auto" });
      };

      const hide = () => {
         if (!visible) return;
         visible = false;
         gsap.to([dot, ring], { opacity: 0, duration: 0.1, overwrite: "auto" });
      };

      const onMouseMove = (e: MouseEvent) => {
         if (!visible) gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
         show();
         dotX(e.clientX);
         dotY(e.clientY);
         ringX(e.clientX);
         ringY(e.clientY);
      };

      const onMouseOver = (e: MouseEvent) => {
         current = getState(e.target as Element | null);
         update();
      };

      const onMouseOut = (e: MouseEvent) => {
         if (!e.relatedTarget) {
            current = "default";
            isClicking = false;
            update();
            hide();
         }
      };

      const onDown = () => { isClicking = true; update(); };
      const onUp = () => { isClicking = false; update(); };

      window.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseover", onMouseOver);
      document.addEventListener("mouseout", onMouseOut);
      window.addEventListener("mousedown", onDown);
      window.addEventListener("mouseup", onUp);
      window.addEventListener("blur", hide);

      return () => {
         gsap.killTweensOf([dot, ring]);
         window.removeEventListener("mousemove", onMouseMove);
         document.removeEventListener("mouseover", onMouseOver);
         document.removeEventListener("mouseout", onMouseOut);
         window.removeEventListener("mousedown", onDown);
         window.removeEventListener("mouseup", onUp);
         window.removeEventListener("blur", hide);
      };
   }, []);

   return { cursorRef, outherRef };
}