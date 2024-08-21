"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string(),
  password: z.string(),
  phone: z.string(),
  role: z.string(),
});

export function SignupForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  return (
    <Form {...form}>
      <form>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="name" />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
