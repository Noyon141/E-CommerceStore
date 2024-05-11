"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { billboardColumn } from "./columns";

interface CellActionsProps {
  data: billboardColumn;
}

export const CellActions: React.FC<CellActionsProps> = ({ data }) => {
  //HOOKS FOR OPENING AND CLOSING THE MODAL AND LOADING STATE
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  //GETTING THE ROUTER AND PARAMS
  const router = useRouter();
  const params = useParams();

  //COPY TO CLIPBOARD FUNCTION

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Billboard Id copied successfully.");
  };

  //DELETE FUNCTION

  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
      router.refresh();
      toast.success("Billboard deleted successfully.");
    } catch (error) {
      toast.error("Make sure you have deleted all the categories first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0" variant={"ghost"}>
          <span className="sr-only">Open Menu</span>
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          className="font-semibold"
          onClick={() => {
            onCopy(data.id);
          }}
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem
          className="font-semibold"
          onClick={() =>
            router.push(`/${params.storeId}/billboards/${data.id}`)
          }
        >
          <Edit className="h-4 w-4 mr-2" />
          Update
        </DropdownMenuItem>
        <DropdownMenuItem
          className="font-semibold"
          onClick={() => {
            onDelete(data.id);
          }}
        >
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
