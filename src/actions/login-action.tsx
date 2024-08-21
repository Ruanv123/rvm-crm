"use server";

import { signIn } from "@/lib/auth";
import { actionClient } from "@/lib/safe-actions";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginUser = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { email, password } }) => {
    await signIn("credentials", { email, password, redirectTo: "/" });

    revalidatePath("/");
  });
