import { DataTable } from '@/components/ui/data-table/dataTable'
import React from 'react'
import { useProductColumns } from '@/components/ui/data-table/columns'
import { useProducts } from '@/hooks/useProducts'
import { DataTablePagination } from '@/components/ui/data-table/dataTablePagination'

const EMPTY_PRODUCTS = []

export default function ProductsPage() {
  const productColumns = useProductColumns()
  const [page, setPage] = React.useState(1);

  const {
    data,
    isPending,
    isError,
    error,
  } = useProducts(page);
  
  console.log("CURRENT PAGE:", page);

  const products = data?.products ?? EMPTY_PRODUCTS;
  const totalPages = data?.totalPages ?? 0;

  if (isPending) return <p>Caricamento prodotti...</p>

  if (isError) {
    return <p role="alert">Errore nel caricamento: {error.message}</p>
  }

  console.log(data);
  return (
    <section className="flex h-full min-h-0 flex-col">
      <h1 className="shrink-0 text-3xl font-bold text-gray-900 dark:text-white">
        Prodotti
      </h1>
      <div className="container mx-auto flex min-h-0 flex-1 flex-col py-5">
        <DataTable columns={productColumns} data={products} />
      </div>
      <div className="flex shrink-0 items-center justify-end space-x-2">
        <DataTablePagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </section>
  )
  
}