"use client";

//IMPORTING PACKAGES

import { useStoreModal } from "@/hooks/use-store-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
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
  //DECLARING CUSTOM HOOKS
  const storeModal = useStoreModal();

  //REACT HOOKS
  const [isLoading, setIsLoading] = useState(false);

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

  //ON SUBMIT FUNCTION

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      //API CALL TO CREATE STORE
      const response = await axios.post("/api/stores", data);

      //IF SUCCESS
      toast.success("Store created successfully.");
    } catch (error: any) {
      toast.error("Failed to create store. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="E-Commerce store name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end space-x-2 pt-6 ">
                <Button
                  variant={"ghost"}
                  disabled={isLoading}
                  onClick={storeModal.onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-black hover:bg-[#0F0F0F]"
                >
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
