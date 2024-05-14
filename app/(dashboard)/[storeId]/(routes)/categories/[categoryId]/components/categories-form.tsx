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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Category } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Heading } from "../../../settings/components/heading";

//INTERFACE FOR SETTINGS FORM COMPONENT

interface CategoriesFormProps {
  initialData: Category | null; //CATEGORY INTERFACE WHICH IS IMPORTED FROM PRISMA CLIENT
  billboards: Billboard[]; //BILLBOARD INTERFACE WHICH IS IMPORTED FROM PRISMA CLIENT
}

export const CategoriesForm = ({
  initialData,
  billboards,
}: CategoriesFormProps) => {
  //DECLARE HOOKS

  //HOOKS FOR OPENING AND CLOSING THE MODAL AND LOADING STATE
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  //GETTING THE ROUTER AND PARAMS

  const router = useRouter();
  const params = useParams();

  //SETTING THE TITLE, DESCRIPTION, TOAST SUCCESS AND TOAST ERROR MESSAGES

  const title = initialData ? "Edit category" : "Create category";
  const description = initialData
    ? "Update category on your preferences."
    : "Add a new category.";
  const toastSuccess = initialData
    ? "Category updated."
    : "New category Created.";
  const toastError = initialData
    ? "Failed to update category"
    : "Failed to create category.";
  const action = initialData ? "Save changes" : "Create";

  //CREATING A FORM SCHEMA USING ZOD AND INFERRING THE TYPE OF THE FORM VALUES

  type CategoriesFormValues = z.infer<typeof formSchema>;

  //FORM SCHEMA USING ZOD

  const formSchema = z.object({
    name: z.string().min(1, "name is required"),
    billboardId: z.string().min(1, "billboard is required"),
  });

  //USE FORM HOOK USING ZOD RESOLVER AND DEFAULT VALUES

  const form = useForm<CategoriesFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      billboardId: "",
    },
  });

  //HANDLE DELETE FUNCTION TO DELETE THE BILLBOARD

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/categories/${params.categoryId}`
      );
      router.refresh();
      router.push("/");
      toast.success("Category deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete category.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  //HANDLE SUBMIT FUNCTION TO CREATE OR UPDATE THE BILLBOARD

  const onSubmit = async (data: CategoriesFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/categories`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/categories`);
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
                      placeholder="Category name"
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-lg">
                    Billboard
                  </FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a billboard."
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem
                          key={billboard.id}
                          value={billboard.id}
                          className="font-semibold"
                        >
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
