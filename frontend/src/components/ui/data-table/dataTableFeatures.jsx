import {
tableFeatures,
  columnVisibilityFeature,
  rowSortingFeature,
  createSortedRowModel,
  columnFilteringFeature,
  createFilteredRowModel,
} from "@tanstack/react-table"

export const dataTableFeatures = tableFeatures({
    columnVisibilityFeature,
    
    rowSortingFeature,
    sortedRowModel: createSortedRowModel(),

    columnFilteringFeature,
    filteredRowModel: createFilteredRowModel(),
});