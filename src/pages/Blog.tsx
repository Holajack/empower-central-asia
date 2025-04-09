
import { useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import BlogList from "@/components/blog/BlogList";
import BlogHero from "@/components/blog/BlogHero";

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen pt-28 bg-gray-50">
      <BlogHero />
      <div className="container mx-auto px-4 py-12">
        <BlogList page={currentPage} postsPerPage={postsPerPage} />
        
        <Pagination className="mt-8">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink onClick={() => handlePageChange(currentPage - 1)}>
                  Previous
                </PaginationLink>
              </PaginationItem>
            )}
            
            <PaginationItem>
              <PaginationLink isActive onClick={() => handlePageChange(1)}>
                1
              </PaginationLink>
            </PaginationItem>
            
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(2)}>
                2
              </PaginationLink>
            </PaginationItem>
            
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink onClick={() => handlePageChange(currentPage + 1)}>
                  Next
                </PaginationLink>
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Blog;
