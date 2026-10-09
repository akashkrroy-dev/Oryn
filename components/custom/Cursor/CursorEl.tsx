import type { ComponentProps } from "react";

export function CursorCard(props: ComponentProps<"div">) {
   return <div data-cursor="card" {...props} />;
}