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
import { SelectOption } from "@/types/api";

interface SearchableSelectProps {
  items: SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchableSelect({
  value,
  onValueChange,
  items,
  placeholder,
}: SearchableSelectProps) {
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const parentRef = React.useRef(null);

  // Filter items based on search term (search in both value and label)
  const filteredItems = React.useMemo(
    () =>
      items.filter(
        (item) =>
          item.value.toLowerCase().includes(search.toLowerCase()) ||
          item.label.toLowerCase().includes(search.toLowerCase())
      ),
    [items, search]
  );

  const virtualizer = useVirtualizer({
    count: filteredItems.length,
    getItemKey: (index) => filteredItems[index].value, // Use value as key
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
            ? items.find((item) => item.value === value)?.label || placeholder
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)]">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={`Search ${placeholder?.toLowerCase() || "items"}...`}
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup
              ref={parentRef}
              className="h-[300px] overflow-y-auto w-full"
            >
              {virtualizer.getVirtualItems().map((virtualItem) => {
                const item = filteredItems[virtualItem.index];
                return (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={() => {
                      onValueChange(item.value);
                      setSearch("");
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    {item.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
