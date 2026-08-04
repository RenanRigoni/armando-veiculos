"use client";

import { useId, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Label, Select } from "@/components/ui/Field";
import { buildEstoqueSearchParams } from "@/lib/estoqueQuery";
import { formatBRL } from "@/lib/format";
import { cn } from "@/lib/utils";
import { CATEGORY_LABELS, isVehicleCategory } from "@/types/vehicle";
import type { InventoryFacets, VehicleFilters } from "@/types/vehicle";

type SearchFiltersProps = {
  facets: InventoryFacets;
  initialValues: VehicleFilters;
  onApplied?: () => void;
};

/**
 * Busca do estoque. Estado de filtro mora na URL — este componente só lê o
 * valor inicial dos searchParams e escreve de volta via router.push.
 * A página que instancia deve usar `key` derivada da query para remontar o
 * form quando a URL mudar (ex.: navegação pelo histórico do navegador).
 */
export function SearchFilters({ facets, initialValues, onApplied }: SearchFiltersProps) {
  const router = useRouter();
  const idPrefix = useId();
  const [isPending, startTransition] = useTransition();

  const [category, setCategory] = useState(initialValues.category ?? "");
  const [make, setMake] = useState(initialValues.make ?? "");
  const [model, setModel] = useState(initialValues.model ?? "");
  const availableMakes =
    category && isVehicleCategory(category) ? facets.makesByCategory[category] : facets.makes;
  const availableModels =
    category && isVehicleCategory(category) ? facets.modelsByCategory[category] : facets.models;

  function handleCategoryChange(value: string) {
    setCategory(value);
    setMake("");
    setModel("");
  }
  const [yearMin, setYearMin] = useState(initialValues.yearMin ? String(initialValues.yearMin) : "");
  const [priceMax, setPriceMax] = useState(initialValues.priceMax ? String(initialValues.priceMax) : "");
  const [mileageMax, setMileageMax] = useState(
    initialValues.mileageMax ? String(initialValues.mileageMax) : "",
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const filters: VehicleFilters = {
      category: category && isVehicleCategory(category) ? category : undefined,
      make: make || undefined,
      model: model || undefined,
      yearMin: yearMin ? Number(yearMin) : undefined,
      priceMax: priceMax ? Number(priceMax) : undefined,
      mileageMax: mileageMax && category === "carros" ? Number(mileageMax) : undefined,
    };

    const query = buildEstoqueSearchParams(filters).toString();
    startTransition(() => {
      router.push(query ? `/estoque?${query}` : "/estoque");
      onApplied?.();
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:items-end",
        category === "carros" ? "lg:grid-cols-4 xl:grid-cols-7" : "lg:grid-cols-6",
      )}
    >
      <div className="col-span-2 sm:col-span-1">
        <Label htmlFor={`${idPrefix}-categoria`}>Categoria</Label>
        <Select
          id={`${idPrefix}-categoria`}
          value={category}
          onChange={(event) => handleCategoryChange(event.target.value)}
        >
          <option value="">Todos</option>
          {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-marca`}>Marca</Label>
        <Select
          id={`${idPrefix}-marca`}
          value={make}
          onChange={(event) => setMake(event.target.value)}
        >
          <option value="">Todas</option>
          {availableMakes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-modelo`}>Modelo</Label>
        <Select
          id={`${idPrefix}-modelo`}
          value={model}
          onChange={(event) => setModel(event.target.value)}
        >
          <option value="">Todos</option>
          {availableModels.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-ano`}>Ano</Label>
        <Select
          id={`${idPrefix}-ano`}
          value={yearMin}
          onChange={(event) => setYearMin(event.target.value)}
        >
          <option value="">A partir de</option>
          {facets.years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-preco`}>Preço até</Label>
        <Select
          id={`${idPrefix}-preco`}
          value={priceMax}
          onChange={(event) => setPriceMax(event.target.value)}
        >
          <option value="">Sem limite</option>
          {[80000, 120000, 160000, 200000, 300000, 500000].map((value) => (
            <option key={value} value={value}>
              {formatBRL(value)}
            </option>
          ))}
        </Select>
      </div>

      {category === "carros" ? (
        <div>
          <Label htmlFor={`${idPrefix}-km`}>KM até</Label>
          <Select
            id={`${idPrefix}-km`}
            value={mileageMax}
            onChange={(event) => setMileageMax(event.target.value)}
          >
            <option value="">Sem limite</option>
            {[20000, 40000, 60000, 80000, 100000, 150000].map((value) => (
              <option key={value} value={value}>
                {new Intl.NumberFormat("pt-BR").format(value)} km
              </option>
            ))}
          </Select>
        </div>
      ) : null}

      <Button
        type="submit"
        disabled={isPending}
        aria-describedby={`${idPrefix}-status`}
        className="col-span-2 sm:col-span-1 lg:col-span-1"
      >
        <Search size={16} aria-hidden />
        {isPending ? "Buscando..." : "Buscar veículos"}
      </Button>
      <span id={`${idPrefix}-status`} className="sr-only" aria-live="polite">
        {isPending ? "Atualizando resultados" : ""}
      </span>
    </form>
  );
}
