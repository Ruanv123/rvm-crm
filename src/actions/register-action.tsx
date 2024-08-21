"use server";

import { actionClient } from "@/lib/safe-actions";
import { z } from "zod";
import { registerUserSchema } from "./schema";
import db from "@/lib/db";
import * as argon2 from "argon2";

export const registerUser = actionClient
  .schema(registerUserSchema)
  .action(async ({ parsedInput: { name, email, password, phone, role } }) => {
    const hashedPass = await argon2.hash(password);

    const existingUser = await db.user.findMany({
      where: { email },
    });

    if (existingUser) {
      return {
        message: "User already exists",
        status: "error",
      };
    }

    const user = await db.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPass,
        phone: phone,
        role: role,
      },
    });

    return user;
  });
