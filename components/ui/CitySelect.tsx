import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { majorIndianCities, City } from "@/lib/cities";

interface CitySelectProps {
  onSelect: (city: City) => void;
  selectedCity?: City;
}

export function CitySelect({ onSelect, selectedCity }: CitySelectProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedCity
            ? `${selectedCity.name}, ${selectedCity.state}`
            : "Select a city..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search for a city..." />
          <CommandEmpty>No city found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {majorIndianCities.map((city) => (
              <CommandItem
                key={`${city.name}-${city.state}`}
                value={`${city.name} ${city.state}`}
                onSelect={() => {
                  onSelect(city);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedCity?.name === city.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {city.name}, {city.state}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
} 