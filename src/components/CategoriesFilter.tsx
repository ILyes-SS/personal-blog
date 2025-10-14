"use client";
import { Category } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const CategoriesFilter = ({ categories }: { categories: Category[] }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams?.get("category") || "all",
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString()); // clone
    params.set("category", selectedCategory as string);
    if (params.get("category") === "all") {
      params.delete("category");
    }

    router.replace(pathname + "?" + params.toString());
  }, [selectedCategory, searchParams, pathname, router]);

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
      {[{ title: "all" }, { title: "liked" }, ...categories].map((category) => {
        return (
          <Button
            variant={"outline"}
            onClick={() => setSelectedCategory(category.title)}
            key={category?.title}
            size="sm"
            className={cn(
              category.title == "liked"
                ? "border-red-500 bg-red-500 text-white hover:bg-red-600"
                : "",
              selectedCategory == category.title &&
                category.title !== "liked" &&
                "border-black bg-black text-white",
              "rounded-full px-3 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm",
            )}
          >
            <span className="hidden sm:inline">#</span>
            {category.title}
            {category.title == "liked" && (
              <Heart stroke="white" className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default CategoriesFilter;
