"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

export const SearchInput = ({ placeholder }: { placeholder: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") || "";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;

    if (search.trim()) {
      router.push(`?page=1&search=${encodeURIComponent(search.trim())}`);
    } else {
      router.push("?page=1");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <Input
        type="text"
        name="search"
        placeholder={placeholder}
        defaultValue={currentSearch}
      />
    </form>
  );
};
