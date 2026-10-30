import {
    ArrowUp,
    ArrowDown,
    ArrowUpDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TableSortableHeader({
  column,
  title,
}) {
  const sorted = column.getIsSorted();

  return (
    <Button
      variant="ghost"
      onClick={() =>
        column.toggleSorting(sorted === "asc")
      }
    >
      {title}

      {sorted === "asc" ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : sorted === "desc" ? (
        <ArrowDown className="ml-2 h-4 w-4" />
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}