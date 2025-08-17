import React from "react";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";


export const AddButton = ({placeholder, url}: {placeholder: string, url: string}) => {
  return (
    <Button variant="outline" asChild>
      <Link href={url}>
        <IconPlus /> {placeholder}
      </Link>
    </Button>
  );
};
