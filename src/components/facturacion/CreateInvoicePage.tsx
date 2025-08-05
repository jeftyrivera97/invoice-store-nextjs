"use client";
import { useProductoStore } from "@/hooks";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const CreateInvoicePage = () => {
  const { startLoading } = useProductoStore();

  useEffect(() => {
    startLoading();
  }, []);

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-4">
      <div>
        <div className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
      </div>

      <div></div>

      <div></div>
    </div>
  );
};
