import React from "react";

type Props = {
  type?: string;
};

// hard-coded by type name for now, IDs should be redone later
const defaultStyle = "bg-zinc-300 border-zinc-500 text-zinc-900";
const badgeTypeStyles = new Map<string, string>([
  ["Inferno", "bg-orange-300 border-orange-500 text-orange-900"],
  ["Aqua", "bg-sky-300 border-sky-500 text-sky-900"],
  ["Terra", "bg-lime-300 border-lime-500 text-lime-900"],
  ["Radiant", "bg-slate-100 border-slate-400 text-slate-900"],
  ["Chaos", "bg-violet-300 border-violet-500 text-violet-900"],
  ["Void", "bg-fuchsia-300 border-fuchsia-500 text-fuchsia-900"],
  ["Dream", "bg-rose-300 border-rose-500 text-rose-900"],
  ["Cyber", "bg-teal-300 border-teal-500 text-teal-900"],
  ["Arcane", "bg-yellow-300 border-yellow-500 text-yellow-900"],
]);

function getStyle(type?: string): string {
  if (!type || !badgeTypeStyles.has(type)) return defaultStyle;

  // guard clause above ensures this value exists
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return badgeTypeStyles.get(type)!;
}

const TypeBadge = ({ type }: Props) => {
  return (
    <div
      className={`flex items-center justify-center rounded-lg border px-3 font-mono ${getStyle(
        type
      )}`}
    >
      {type || "????"}
    </div>
  );
};

export default TypeBadge;
