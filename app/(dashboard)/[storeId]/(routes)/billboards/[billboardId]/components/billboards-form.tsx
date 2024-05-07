"use client";

//IMPORTS FOR THE SETTINGS FORM COMPONENT

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { UseOrigin } from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Heading } from "../../../settings/components/heading";

//INTERFACE FOR SETTINGS FORM COMPONENT

interface BillboardsFormProps {
  initialData: Billboard | null; //STORE INTERFACE WHICH IS IMPORTED FROM PRISMA CLIENT
}

export const BillboardsForm = ({ initialData }: BillboardsFormProps) => {
  //DECLARE HOOKS

  //HOOKS FOR OPENING AND CLOSING THE MODAL AND LOADING STATE
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  //GETTING THE ROUTER AND PARAMS

  const router = useRouter();
  const params = useParams();

  const origin = UseOrigin(); //GETTING THE ORIGIN OF THE WEBSITE

  const title = initialData ? "Edit billboard" : "Create billboard";
  const description = initialData ? "Edit billboard" : "Add a new billboard.";
  const toastMessage = initialData ? "Billboard updated" : "Created billboard.";
  const action = initialData ? "Save changes" : "Create";

  //CREATING A FORM SCHEMA USING ZOD AND INFERRING THE TYPE OF THE FORM VALUES

  type BillboardsFormValues = z.infer<typeof formSchema>;

  //FORM SCHEMA USING ZOD

  const formSchema = z.object({
    label: z.string().min(1, "label is required"),
    imageUrl: z.string().min(1, "image is required"),
  });

  //USE FORM HOOK USING ZOD RESOLVER AND DEFAULT VALUES

  const form = useForm<BillboardsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  //HANDLE DELETE FUNCTION

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast.success("Store deleted successfully");
    } catch (error) {
      toast.error(
        "Make sure you have deleted all the products and categories first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  //HANDLE SUBMIT FUNCTION

  const onSubmit = async (data: BillboardsFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast.success("Store updated successfully");
    } catch (error) {
      toast.error("Failed to update store");
    } finally {
      setLoading(false);
    }
  };

  //RENDER THE FORM

  return (
    <>
      {/* ALERT MODAL COMPONENT */}

      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={loading}
        onConfirm={onDelete}
      />
      {/* HEADING COMPONENT */}
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            variant={"destructive"}
            size={"icon"}
            className=""
            onClick={() => setOpen(true)}
            disabled={loading}
          >
            <Trash className="h-5 w-5 font-semibold" />
          </Button>
        )}
      </div>
      <Separator />

      {/* FORM COMPONENT */}

      <Form {...form}>
        <form
          className="w-full space-y-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid sm:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-lg">Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      {...field}
                      placeholder="Billboard label"
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit" className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};
