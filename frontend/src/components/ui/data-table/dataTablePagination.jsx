import { Button } from "@/components/ui/button";

export function DataTablePagination({
  page,
  totalPages,
  onPageChange,
}) {
  
  console.log({
  page,
  totalPages,
  disabledNext: totalPages === 0 || page >= totalPages,
});
  return (
    <div className="flex items-center justify-end gap-2 py-4">
      <Button
        variant="outline"
        disabled={totalPages === 0 || page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>

      <span>
        {totalPages === 0 ? "Nessuna pagina" : `Pagina ${page} di ${totalPages}`}
      </span>

      <Button
        variant="outline"
        disabled={totalPages === 0 || page >= totalPages}
        onClick={() =>{console.log("NEXT CLICK"), onPageChange(page + 1)}}
      >
        Next
      </Button>
    </div>
  );
}
