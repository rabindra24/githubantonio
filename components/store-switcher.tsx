"use client";

import React, { useState } from "react";
import { Store } from "@prisma/client";
import {
  Check,
  ChevronsUpDown,
  Plus,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";
import { useStoreModal } from "@/hooks/use-store-modal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useParams, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { useRole } from "@/hooks/use-role";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@clerk/nextjs";
import { useClerk } from '@clerk/nextjs';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}
export default function StoreSwitcher({
  className,
  items = [],
}: StoreSwitcherProps) {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  // console.log(userId);
  const { signOut } = useClerk();

  const role = useRole();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  // console.log(currentStore);

  const [open, setOpen] = useState(false);

  const onStoreSelect = (store: { value: string; label: string }) => {
    // console.log(store);
    setOpen(true);
    router.push(`/${store.value}`);
  };

  // console.log(role);


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="w-4 h-4 mr-2" />
          {currentStore?.label}
          <ChevronsUpDown className="w-4 h-4 ml-auto opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            {role === "ADMIN" && (
              <>
                {/* <CommandInput placeholder="Search Store..." /> */}
                {/* <CommandEmpty>No store found.</CommandEmpty> */}
                <CommandGroup heading="Stores">
                  {formattedItems.map((store, index) => (
                    <Button
                      key={index}
                      onClick={() => onStoreSelect(store)}
                      className="text-sm w-full"
                      variant={"outline"}
                    >
                      <StoreIcon className="w-4 h-4 mr-2" />
                      {store.label}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          currentStore?.value === store.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </Button>
                  ))}
                </CommandGroup>{" "}
              </>
            )}
          </CommandList>
          <CommandSeparator />
          {/* <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  alert("jjj");
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList> */}
          <CommandList>
            {role === "ADMIN" && (
              <Button
                onClick={() => {
                  // setOpen(false);
                  // alert("jjj");
                  // storeModal.onOpen();
                  signOut();
                }}
                className="w-full bg-transparent text-white hover:bg-transparent hover:text-gray-300"
              >
                <Plus className="w-4 h-4" /> Add a Store
              </Button>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
