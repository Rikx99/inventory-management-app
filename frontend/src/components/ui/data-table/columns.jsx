import { useMemo } from "react"
import { useAuthStore } from "@/store/useAuthStore"

const baseColumns = [
  {
    accessorKey: "title",
    header: "Nome prodotto",
    enableSorting: true,
    enableFiltering: true,

  },
  {
    accessorKey: "description",
    header: "Descrizione",
    enableSorting: false,
    enableFiltering: true,
    meta: {
      className:"hidden xl:table-cell",
    },
    cell: ({ row }) => {
      const text = row.getValue("description") ?? "";
      return (
        <div className="max-w-sm whitespace-normal breake-words">
          {text.length > 80 ? 
          `${text.slice(0, 80)}...` : text}
        </div>
      ) 
    },
  },
  {
    accessorKey: "price",
    header: "Prezzo",
    enableSorting: true,
    enableFiltering: true,
    cell: ({ row }) =>{ 
      const price = Number(row.getValue("price"));
      return `${price.toFixed(2)} €`;
    }
  },
  {
    accessorKey: "stock_quantity",
    header: "Disponibilità",
    enableSorting: true,
    enableFiltering: true,
  },
  {
    accessorKey: "category_name",
    header: "Categoria",
    enableSorting: true,
    enableFiltering: true,
  },
]

const adminColumns = [
  {
    accessorKey: "created_by_username",
    header: "Creato da",
    enableSorting: true,
    enableFiltering: true,
    meta: {
      className:"hidden lg:table-cell",
    }
  },
  {
    accessorKey: "created_at",
    header: "Creato il",
    enableSorting: true,
    enableFiltering: false,
    meta: {
        className:"hidden lg:table-cell",
      },
    cell: ({ row }) => {
      const date = row.getValue("created_at")
      return new Date(date).toLocaleDateString("it-IT")
    },
  },
  {
    accessorKey: "updated_at",
    header: "Aggiornato il",
    enableSorting: true,
    enableFiltering: false,
    meta:{
      className:"hidden lg:table-cell"
    },
    cell: ({ row }) => {
      const date = row.getValue("updated_at")
      return new Date(date).toLocaleDateString("it-IT")
    },
  },
]

export function useProductColumns() {
  const isAdmin = useAuthStore((state) => state.user?.role === "admin")

  return useMemo(   // useMemo mantiene la lista delle colone finchè is Admin non cambia
    () => (isAdmin ? [...baseColumns, ...adminColumns] : baseColumns),
    [isAdmin],
  )
}
