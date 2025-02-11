import {
  Command,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandEmpty,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

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
  const [open, setOpen] = React.useState(false);

  return (
    // <Popover open={open} onOpenChange={setOpen}>
    //   <PopoverTrigger asChild>
    //     <Button
    //       variant="outline"
    //       role="combobox"
    //       aria-expanded={open}
    //       className="w-full justify-between bg-[#1C1F26] border-[#2A2D34] text-white hover:bg-[#2A2D34] hover:text-white"
    //     >

    //       {/* {value
    //         ? items?.find((item) => item.id === value)?.symbol +
    //           " " +
    //           items?.find((item) => item.id === value)?.name
    //         : placeholder} */}
    //       <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    //     </Button>
    //   </PopoverTrigger>
    //   <PopoverContent className="w-full p-0">
    //     <Command>
    //       <CommandInput
    //         placeholder={`Search ${placeholder.toLowerCase()}...`}
    //       />
    //       <CommandEmpty>No item found.</CommandEmpty>
    //       <CommandGroup>
    //         {/* <CommandItem
    //           key={items[0]?.id}
    //           onSelect={() => {
    //             onValueChange(items[0]?.id);
    //             setOpen(false);
    //           }}
    //         >
    //           {items[0]?.symbol} {items[0]?.name}
    //           <Check
    //             className={`mr-2 h-4 w-4 ${
    //               value === items[0]?.id ? "opacity-100" : "opacity-0"
    //             }`}
    //           />
    //         </CommandItem> */}
    //         {/* {items?.map((item) => (
    //             <CommandItem
    //               key={item?.id}
    //               onSelect={() => {
    //                 onValueChange(item?.id);
    //                 setOpen(false);
    //               }}
    //             >
    //               <Check
    //                 className={`mr-2 h-4 w-4 ${value === item?.id ? "opacity-100" : "opacity-0"}`}
    //               />
    //               {item?.symbol} {item?.name}
    //             </CommandItem>
    //           ))} */}
    //       </CommandGroup>
    //     </Command>
    //   </PopoverContent>
    // </Popover>
    <Command>
        <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
        <CommandEmpty>No item found.</CommandEmpty>
        <CommandGroup>
            {items?.map((item) => (
                <CommandItem key={item?.id}>{item?.symbol} {item?.name}</CommandItem>
            ))}
        </CommandGroup>
    </Command>
  );
}
