"use client";

import mermaid from "mermaid";
import { useEffect, useRef } from "react";

mermaid.initialize({
  startOnLoad: true,
  theme: "forest", // matches your green theme
  er: { useMaxWidth: true },
});

export default function MermaidDiagram({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.contentLoaded();
    }
  }, [code]);

  return (
    <div className="mermaid overflow-x-auto rounded-lg bg-green-950/50 p-4 border border-green-700">
      {code}
    </div>
  );
}
