import { Task } from "../../../types";
import type { Column } from "../KanbanBoard/kanbanUtils";

// Fonction pour convertir une couleur de colonne en couleur de badge
const getColumnBadgeStyle = (columnColor: string) => {
  // Mapping des couleurs de colonnes vers des styles de badge avec texte approprié
  const colorMap = {
    "bg-blue-50 dark:bg-blue-900/20":
      "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
    "bg-purple-50 dark:bg-purple-900/20":
      "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
    "bg-pink-50 dark:bg-pink-900/20":
      "bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300",
    "bg-indigo-50 dark:bg-indigo-900/20":
      "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300",
    "bg-cyan-50 dark:bg-cyan-900/20":
      "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300",
    "bg-teal-50 dark:bg-teal-900/20":
      "bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300",
    "bg-emerald-50 dark:bg-emerald-900/20":
      "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300",
    "bg-lime-50 dark:bg-lime-900/20":
      "bg-lime-50 dark:bg-lime-900/20 text-lime-700 dark:text-lime-300",
    "bg-yellow-50 dark:bg-yellow-900/20":
      "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300",
    "bg-amber-50 dark:bg-amber-900/20":
      "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300",
    "bg-red-50 dark:bg-red-900/20":
      "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300",
    "bg-rose-50 dark:bg-rose-900/20":
      "bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300",
    "bg-slate-50 dark:bg-slate-900/20":
      "bg-slate-50 dark:bg-slate-900/20 text-slate-700 dark:text-slate-300",
    "bg-zinc-50 dark:bg-zinc-900/20":
      "bg-zinc-50 dark:bg-zinc-900/20 text-zinc-700 dark:text-zinc-300",
    "bg-stone-50 dark:bg-stone-900/20":
      "bg-stone-50 dark:bg-stone-900/20 text-stone-700 dark:text-stone-300",
  };

  return (
    colorMap[columnColor as keyof typeof colorMap] ||
    "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
  );
};

export const getStatusBadge = (status: Task["status"], columns: Column[]) => {
  // Try to find the column for this status
  const column = columns.find((col) => col.id === status);

  // Default styles for known statuses - using soft colors consistent with design
  const defaultStyles = {
    todo: "bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300",
    "in-progress":
      "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300",
    done: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300",
  } as const;

  const defaultLabels = {
    todo: "To do",
    "in-progress": "In progress",
    done: "Done",
  } as const;

  // If it's a default status, use predefined styles
  if (status in defaultStyles) {
    const statusKey = status as keyof typeof defaultStyles;
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${defaultStyles[statusKey]}`}
      >
        {defaultLabels[statusKey]}
      </span>
    );
  }

  // For custom columns, use the column's color with appropriate text color
  if (column?.color) {
    const badgeStyle = getColumnBadgeStyle(column.color);
    const label = column?.title || status;

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${badgeStyle}`}
      >
        {label}
      </span>
    );
  }

  // Fallback for unknown custom columns
  const fallbackStyle =
    "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300";
  const label = status;

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${fallbackStyle}`}
    >
      {label}
    </span>
  );
};
