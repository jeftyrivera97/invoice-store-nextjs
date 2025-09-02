import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ComprobantePagosTotal = () => {
  const { total } = useSelector((state: RootState) => state.invoice);

  return (
    <>
      <Label htmlFor="total_pago">Total a Pagar</Label>
      <Input
        id="total_pago"
        type="text"
        required
        readOnly
        value={`L ${total.toFixed(2)}`}
        className="col-span-2"
      />
    </>
  );
};
