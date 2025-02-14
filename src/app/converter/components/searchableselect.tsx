import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandEmpty,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";

import React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

interface SearchableSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  items: Array<{ id: string; symbol: string; name: string }>;
  placeholder: string;
}

export default function SearchableSelect({
  value,
  onValueChange,
  items,
  placeholder,
}: SearchableSelectProps) {
  // Add memoization for search filtering
  const [search, setSearch] = React.useState("");

  const filteredItems = React.useMemo(
    () =>
      items.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.symbol.toLowerCase().includes(search.toLowerCase())
      ),
    [items, search]
  );

  const [open, setOpen] = React.useState(false);
  const parentRef = React.useRef(null);

  const virtualizer = useVirtualizer({
    count: filteredItems.length,
    getItemKey: (index) => filteredItems[index].id,
    estimateSize: () => 32,
    overscan: 5,
    getScrollElement: () => parentRef.current,
  });

  if (!Array.isArray(items)) {
    console.error("Items must be an array");
    return null;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={Boolean(open)}
          className="w-full justify-between bg-[#1C1F26] border-[#2A2D34] text-white hover:bg-[#2A2D34] hover:text-white"
        >
          {value
            ? items?.find((item) => item.id === value)?.symbol.toUpperCase() +
              " " +
              items?.find((item) => item.id === value)?.name
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command shouldFilter={false}>
          {/* Disable built-in filtering */}
          <CommandInput
            placeholder={`Search ${placeholder.toLowerCase()}...`}
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup
              ref={parentRef}
              className="h-[300px] overflow-y-auto w-[400px]"
            >
              {virtualizer.getVirtualItems().map((virtualItem) => (
                <CommandItem
                  key={filteredItems[virtualItem.index].id}
                  value={filteredItems[virtualItem.index].name}
                  onSelect={() => {
                    onValueChange(filteredItems[virtualItem.index].id);
                    setSearch(""); // Reset search after selection
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  {filteredItems[virtualItem.index].symbol.toUpperCase()}{" "}
                  {filteredItems[virtualItem.index].name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
