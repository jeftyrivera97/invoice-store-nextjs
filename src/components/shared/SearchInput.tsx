import { Input } from "@/components/ui/input";

export const SearchInput = ({ placeholder }: { placeholder: string }) => {
  return (
    <form method="GET" className="mb-4">
      <Input type="text" name="search" placeholder={placeholder} />
    </form>
  );
};
