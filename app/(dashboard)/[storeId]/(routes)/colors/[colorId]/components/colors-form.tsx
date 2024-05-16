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
import { zodResolver } from "@hookform/resolvers/zod";
import { Color } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Heading } from "../../../settings/components/heading";

//INTERFACE FOR SETTINGS FORM COMPONENT

interface ColorsFormProps {
  initialData: Color | null; //STORE INTERFACE WHICH IS IMPORTED FROM PRISMA CLIENT
}

export const ColorsForm = ({ initialData }: ColorsFormProps) => {
  //DECLARE HOOKS

  //HOOKS FOR OPENING AND CLOSING THE MODAL AND LOADING STATE
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  //GETTING THE ROUTER AND PARAMS

  const router = useRouter();
  const params = useParams();

  //SETTING THE TITLE, DESCRIPTION, TOAST SUCCESS AND TOAST ERROR MESSAGES

  const title = initialData ? "Edit color" : "Create color";
  const description = initialData ? "Edit color" : "Add a new color.";
  const toastSuccess = initialData ? "Color updated." : "Color Created.";
  const toastError = initialData
    ? "Failed to update color"
    : "Failed to create color.";
  const action = initialData ? "Save changes" : "Create";

  //CREATING A FORM SCHEMA USING ZOD AND INFERRING THE TYPE OF THE FORM VALUES

  type ColorsFormValues = z.infer<typeof formSchema>;

  //FORM SCHEMA USING ZOD

  const formSchema = z.object({
    name: z.string().min(1, "name is required"),
    value: z
      .string()
      .min(4, {
        message: "Value must contain at least 4 characters.",
      })
      .regex(/^#/, {
        message: "Color value should be valid hex code.",
      }),
  });

  //USE FORM HOOK USING ZOD RESOLVER AND DEFAULT VALUES

  const form = useForm<ColorsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  //HANDLE DELETE FUNCTION TO DELETE THE COLOR

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      router.refresh();
      router.push("/${params.storeId}/colors");
      toast.success("Color deleted successfully.");
    } catch (error) {
      toast.error(
        "Make sure you have deleted all the products using colors first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  //HANDLE SUBMIT FUNCTION TO CREATE OR UPDATE THE COLOR

  const onSubmit = async (data: ColorsFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/colors`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success(toastSuccess);
    } catch (error) {
      toast.error(toastError);
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-lg">Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      {...field}
                      placeholder="Color name"
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-lg">Value</FormLabel>
                  <FormControl>
                    <div className="flex gap-x-4">
                      <Input
                        disabled={loading}
                        {...field}
                        placeholder="Color value"
                        className=""
                      />
                      <div
                        className="p-5 border rounded-full "
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
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
    </>
  );
};
