"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface AppPaginationProps {
  count: number
  currentPage?: number
  totalPages?: number
  hasNextPage?: boolean
  hasPreviousPage?: boolean
  onPaginationChange: (perPage: string, currentPage: number) => void
}

const AppPagination: React.FC<AppPaginationProps> = ({
  count,
  currentPage: externalCurrentPage,
  totalPages: externalTotalPages,
  hasNextPage,
  hasPreviousPage,
  onPaginationChange,
}) => {
  const [perPage, setPerPage] = useState<string>("10")
  const [internalCurrentPage, setInternalCurrentPage] = useState<number>(1)

  // Use external values if provided, otherwise calculate locally
  const currentPage = externalCurrentPage || internalCurrentPage
  const totalPages = externalTotalPages || Math.ceil(count / Number.parseInt(perPage))

  // Update internal state when external props change
  useEffect(() => {
    if (externalCurrentPage) {
      setInternalCurrentPage(externalCurrentPage)
    }
  }, [externalCurrentPage])

  // Handle row per page change
  const handleRowPerPageChange = (value: string) => {
    setPerPage(value)
    setInternalCurrentPage(1)
    onPaginationChange(value, 1)
  }

  // Handle pagination
  const handlePagination = (type: "first" | "last" | "next" | "prev") => {
    let newPage = currentPage

    switch (type) {
      case "first":
        newPage = 1
        break
      case "prev":
        if (currentPage > 1) {
          newPage = currentPage - 1
        }
        break
      case "next":
        if (currentPage < totalPages) {
          newPage = currentPage + 1
        }
        break
      case "last":
        newPage = totalPages
        break
    }

    if (newPage !== currentPage) {
      setInternalCurrentPage(newPage)
      onPaginationChange(perPage, newPage)
    }
  }

  // Determine if buttons should be disabled based on external props or calculated values
  const isPrevDisabled = hasPreviousPage !== undefined ? !hasPreviousPage : currentPage <= 1
  const isNextDisabled = hasNextPage !== undefined ? !hasNextPage : currentPage >= totalPages

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-gray-400">{`Page ${currentPage} of ${totalPages}`}</div>
      <div className="space-x-2 flex items-center gap-4">
        <div className="flex items-center gap-2 w-full">
          <span className="text-sm text-gray-400 lg:block hidden">Rows per page</span>

          <Select onValueChange={handleRowPerPageChange} value={perPage}>
            <SelectTrigger className="w-[70px] h-[30px] pe-1 border border-gray-600 bg-transparent rounded-md">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button className="border border-white bg-transparent"  disabled={isPrevDisabled} onClick={() => handlePagination("first")}>
            <ChevronsLeft />
          </Button>
          <Button className="border border-white bg-transparent"  disabled={isPrevDisabled} onClick={() => handlePagination("prev")}>
            <ChevronLeft />
          </Button>
          <Button className="border border-white bg-transparent"  disabled={isNextDisabled} onClick={() => handlePagination("next")}>
            <ChevronRight />
          </Button>
          <Button className="border border-white bg-transparent"  disabled={isNextDisabled} onClick={() => handlePagination("last")}>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AppPagination
