"use client";

//IMPORTS FOR THE SETTINGS FORM COMPONENT

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageUpload } from "@/components/ui/image-upload";
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
import { Category, Color, Image, Product, Size } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Heading } from "../../../settings/components/heading";

//INTERFACE FOR SETTINGS FORM COMPONENT

interface ProductsFormProps {
  initialData:
    | (Product & {
        images: Image[];
      })
    | null; //STORE INTERFACE WHICH IS IMPORTED FROM PRISMA CLIENT

  //INTERFACE FOR CATEGORIES, COLORS AND SIZES

  categories: Category[];
  colors: Color[];
  sizes: Size[];
}

export const ProductsForm = ({
  initialData,
  categories,
  sizes,
  colors,
}: ProductsFormProps) => {
  //DECLARE HOOKS

  //HOOKS FOR OPENING AND CLOSING THE MODAL AND LOADING STATE
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  //GETTING THE ROUTER AND PARAMS

  const router = useRouter();
  const params = useParams();

  //SETTING THE TITLE, DESCRIPTION, TOAST SUCCESS AND TOAST ERROR MESSAGES

  const title = initialData ? "Edit product." : "Create product.";
  const description = initialData ? "Edit product." : "Add a new product.";
  const toastSuccess = initialData ? "Product updated." : "Product Created.";
  const toastError = initialData
    ? "Failed to update product."
    : "Failed to create product.";
  const action = initialData ? "Save changes" : "Create";

  //CREATING A FORM SCHEMA USING ZOD AND INFERRING THE TYPE OF THE FORM VALUES

  type ProductsFormValues = z.infer<typeof formSchema>;

  //FORM SCHEMA USING ZOD

  const formSchema = z.object({
    name: z.string().min(1, "name is required"),
    images: z.object({ url: z.string() }).array(),
    categoryId: z.string().min(1, "category is required"),
    sizeId: z.string().min(1, "size is required"),
    colorId: z.string().min(1, "color is required"),
    price: z.coerce.number().min(1, "price is required."),
    isArchived: z.boolean().default(false).optional(),
    isFeatured: z.boolean().default(false).optional(),
  });

  //USE FORM HOOK USING ZOD RESOLVER AND DEFAULT VALUES

  const form = useForm<ProductsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? { ...initialData, price: parseFloat(String(initialData?.price)) }
      : {
          name: "",
          images: [],
          isArchived: false,
          isFeatured: false,
          categoryId: "",
          sizeId: "",
          colorId: "",
          price: 0,
        },
  });

  //HANDLE DELETE FUNCTION TO DELETE THE PRODUCT

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push("/${params.storeId}/products");
      toast.success("Product deleted successfully.");
    } catch (error) {
      toast.error("Make sure you have deleted all the categories first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  //HANDLE SUBMIT FUNCTION TO CREATE OR UPDATE THE PRODUCT

  const onSubmit = async (data: ProductsFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/products`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/products`);
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
          {/* ADDED A FORM FIELD FOR IMAGE UPLOAD */}

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                      placeholder="Product name"
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-lg">Price</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      {...field}
                      placeholder="99.9"
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* //ADDED FORM FIELD FOR CATEGORY, SIZE AND COLOR */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-lg">
                    Category
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
                          placeholder="Select a category."
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                          className="font-semibold"
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-lg">Size</FormLabel>
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
                          placeholder="Select size."
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem
                          key={size.id}
                          value={size.id}
                          className="font-semibold"
                        >
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-lg">Color</FormLabel>
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
                          placeholder="Select a category."
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem
                          key={color.id}
                          value={color.id}
                          className="font-semibold"
                        >
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-3 leading-none">
                    <FormLabel className="font-semibold">Featured</FormLabel>
                    <FormDescription>
                      This product will appear on the home page.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-3 leading-none">
                    <FormLabel className="font-semibold">Archived</FormLabel>
                    <FormDescription>
                      This product will not appear anywhere in the store.
                    </FormDescription>
                  </div>
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
