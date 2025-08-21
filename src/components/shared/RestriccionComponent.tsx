import { AlertCircleIcon } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export const RestriccionComponent = ({title, description, instruction}: {title:string, description:string, instruction:string}) => {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          <p>{description}</p>
          <ul className="list-inside list-disc text-sm">
            <li>{instruction}</li>

          </ul>
        </AlertDescription>
      </Alert>
    </div>
  )
}