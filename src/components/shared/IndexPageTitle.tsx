import { IconList } from "@tabler/icons-react";

export const IndexPageTitle = ({title} :{title:string}) => {
  return (
    <div className="flex items-center gap-2">
          <IconList className="w-5 h-5" />
          <p className="text-sm font-medium">{title}</p>
        </div>
  )
}
