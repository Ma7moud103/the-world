"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setcount] = useState(0);
  return (
    <div>
      <button onClick={() => setcount((e) => e + 1)}>count: {count}</button>
    </div>
  );
}
