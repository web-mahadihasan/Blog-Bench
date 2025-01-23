"use client"
import { ChevronLeft, ChevronRight, } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Blogs =  () => {
    const [blogs, setBlogs] = useState([])
    const [pageSize, setPageSize] = useState(15);
    const [loading, setLoading] = useState()
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const getBlogs = async () => {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts")
            const data = await res.json()
            setBlogs(data)
        }
        getBlogs()
    }, [])


  const totalPages = Math.ceil(blogs?.length / pageSize);

  const paginatedData = blogs?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };
    
  return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {
            paginatedData?.map(data => <div key={data.id} className="p-4 border border-gray-300 rounded-md shadow group hover:shadow-lg">
                <Link href={`/blog/${data.id}`} className="text-xl text-gray-700 capitalize duration-300 transition-all group-hover:text-blue-600 group-hover:underline">
                  {data.title}
                </Link>
            </div>)
          }
        </div>

          {/* Control page  */}
          <div className='flex items-center justify-between my-6'>
            <div className="text-sm text-gray-500">
                Showing {(currentPage - 1) * pageSize + 1} to{" "}
                {Math.min(currentPage * pageSize, blogs?.length)} of{" "}
                {blogs?.length} results
            </div>

            {/* Page  */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="border border-gray-200 hover:bg-gray-50 cursor-pointer text-[0.9rem] rounded-md"
                >
                <ChevronLeft />
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
                pageNum = i + 1;
            } else if (currentPage <= 3) {
                pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
            } else {
                pageNum = currentPage - 2 + i;
            }

                return (
                    <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`${
                        pageNum === currentPage && "bg-black text-white"
                    } border border-gray-200 px-[10px] text-[0.9rem] py-[1px] rounded-md`}
                    >
                    {pageNum}
                    </button>
            );
            })}
            </div>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border border-gray-200 cursor-pointer hover:bg-gray-50 text-[0.9rem] rounded-md"
            >
                <ChevronRight />
            </button>
            </div>
          </div>
    </div>
  )
}

export default Blogs
