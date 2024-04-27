"use client";

//IMPORTING PACKAGES

import { useStoreModal } from "@/hooks/use-store-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Modal } from "../ui/modal";

//STORE MODAL COMPONENT
export const StoreModal = () => {
  //DECLARING HOOKS
  const storeModal = useStoreModal();

  //APPLYING ZOD SCHEMA AND SUBMITTING OPTION TO FORM
  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    //TODO: Create store
  };
  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products & categories."
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="E-Commerce store name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end space-x-2 pt-6 ">
                <Button variant={"ghost"} onClick={storeModal.onClose}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-black hover:bg-[#0F0F0F]">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
