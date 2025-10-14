"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [text, setText] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString()); // clone
      if (text.trim()) {
        params.set("search", text.trim());
      } else {
        params.delete("search");
      }
      router.replace(pathname + "?" + params.toString());
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [text, searchParams, router, pathname]);

  return (
    <div className="relative mx-auto w-full max-w-md">
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search posts..."
        className="w-full py-2 pr-4 pl-10"
      />
    </div>
  );
};

export default SearchBar;
