"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { cn } from "@/lib/utils";
import { Store } from "@prisma/client";
import { ChevronsUpDown, Store as StoreIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { Popover, PopoverTrigger } from "./ui/popover";

//DECLARING THE PROPS FOR THE STORE SWITCHER TRIGGER

type StoreSwitcherTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends StoreSwitcherTriggerProps {
  items?: Store[];
}

//CREATING THE STORE SWITCHER COMPONENT
export const StoreSwitcher = ({
  className,
  items = [],
}: StoreSwitcherProps) => {
  //DECLARING THE HOOKS TO USE THEM ON THE COMPONENT

  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const [Open, setOpen] = React.useState(false);

  //FORMATTING THE STORES TO BE USED ON THE STORE SWITCHER
  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  //GETTING THE CURRENT STORE
  const currentStore = items.find((item) => item.id === params.storeId);

  //SETTING THE CURRENT STORE VALUE

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);

    router.push(`/${store.value}`);
  };
  //RETURNING THE STORE SWITCHER TRIGGER

  return (
    <Popover open={Open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className={cn("justify-between w-40", className)}
          variant={"outline"}
          size={"sm"}
          role="combobox"
          aria-expanded={Open}
          aria-label="Select a store"
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          Current Store
          <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
    </Popover>
  );
};
