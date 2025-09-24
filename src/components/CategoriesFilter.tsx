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
  }, [selectedCategory]);

  return (
    <div className="flex gap-2">
      {" "}
      {[{ title: "all" }, { title: "liked" }, ...categories].map((category) => {
        return (
          <Button
            variant={"outline"}
            onClick={() => setSelectedCategory(category.title)}
            key={category?.title}
            className={cn(
              category.title == "liked" ? "bg-red-500 text-white" : "",
              selectedCategory == category.title && "bg-black text-white",
              "rounded-2xl",
            )}
          >
            #{category.title}
            {category.title == "liked" ? <Heart stroke="white" /> : null}{" "}
          </Button>
        );
      })}{" "}
    </div>
  );
};

export default CategoriesFilter;
