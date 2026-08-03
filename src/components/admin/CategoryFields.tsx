import type { UseFormRegister } from "react-hook-form";

import { Label, Input } from "@/components/ui/Field";
import type { VehicleDraftSchema } from "@/schemas/vehicle";
import type { VehicleCategory } from "@/types/vehicle";

type CategoryFieldsProps = {
  category: VehicleCategory;
  register: UseFormRegister<VehicleDraftSchema>;
};

/** Campos específicos por categoria — nunca força km/portas em barco, nem horas de motor em carro. */
export function CategoryFields({ category, register }: CategoryFieldsProps) {
  if (category === "carros") {
    return (
      <>
        <div>
          <Label htmlFor="mileage">Quilometragem</Label>
          <Input id="mileage" type="number" inputMode="numeric" {...register("mileage")} />
        </div>
        <div>
          <Label htmlFor="transmission">Câmbio</Label>
          <Input id="transmission" placeholder="Automático" {...register("transmission")} />
        </div>
        <div>
          <Label htmlFor="fuel">Combustível</Label>
          <Input id="fuel" placeholder="Flex" {...register("fuel")} />
        </div>
        <div>
          <Label htmlFor="engine">Motor</Label>
          <Input id="engine" placeholder="2.0 16V" {...register("engine")} />
        </div>
        <div>
          <Label htmlFor="bodyType">Carroceria</Label>
          <Input id="bodyType" placeholder="Sedan" {...register("bodyType")} />
        </div>
        <div>
          <Label htmlFor="doors">Portas</Label>
          <Input id="doors" type="number" inputMode="numeric" {...register("doors")} />
        </div>
      </>
    );
  }

  if (category === "motos") {
    return (
      <>
        <div>
          <Label htmlFor="mileage">Quilometragem</Label>
          <Input id="mileage" type="number" inputMode="numeric" {...register("mileage")} />
        </div>
        <div>
          <Label htmlFor="engineDisplacement">Cilindrada (cc)</Label>
          <Input
            id="engineDisplacement"
            type="number"
            inputMode="numeric"
            {...register("engineDisplacement")}
          />
        </div>
        <div>
          <Label htmlFor="fuel">Combustível</Label>
          <Input id="fuel" placeholder="Gasolina" {...register("fuel")} />
        </div>
        <div>
          <Label htmlFor="engine">Motor</Label>
          <Input id="engine" placeholder="Bicilíndrico 471cc" {...register("engine")} />
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <Label htmlFor="engine">Motor</Label>
        <Input id="engine" placeholder="Mercruiser 250HP" {...register("engine")} />
      </div>
      <div>
        <Label htmlFor="engineHours">Horas de motor</Label>
        <Input id="engineHours" type="number" inputMode="numeric" {...register("engineHours")} />
      </div>
    </>
  );
}
