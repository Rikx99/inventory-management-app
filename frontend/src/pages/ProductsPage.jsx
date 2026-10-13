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
    <section>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Prodotti
      </h1>

      <DataTable columns={productColumns} data={products} />

      <DataTablePagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </section>
  )
  
}