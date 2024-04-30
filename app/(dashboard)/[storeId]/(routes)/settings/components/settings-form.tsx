"use client";
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
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Heading } from "./heading";

interface SettingsFormProps {
  initialData: Store;
}

export const SettingsForm = ({ initialData }: SettingsFormProps) => {
  //DECLARE HOOKS

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  //CREATING A FORM SCHEMA USING ZOD AND INFERRING THE TYPE OF THE FORM VALUES
  type SettingsFormValues = z.infer<typeof formSchema>;

  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
  });

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  //HANDLE FORM SUBMISSION
  const onSubmit = async (data: SettingsFormValues) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Settings"
          description="Manage store preferences and settings."
        />

        <Button
          variant={"destructive"}
          size={"icon"}
          className=""
          onClick={() => {}}
          disabled={loading}
        >
          <Trash className="h-5 w-5 font-semibold" />
        </Button>
      </div>
      <Separator />
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
                      placeholder="Store name"
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit" className="ml-auto">
            Save Changes
          </Button>
        </form>
      </Form>
    </>
  );
};
