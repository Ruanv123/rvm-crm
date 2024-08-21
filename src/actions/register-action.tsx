"use server";

import { actionClient } from "@/lib/safe-actions";
import { registerUserSchema } from "./schema";
import db from "@/lib/db";
import bcrypt from "bcryptjs";

export const registerUser = actionClient
  .schema(registerUserSchema)
  .action(async ({ parsedInput: { name, email, password, phone, role } }) => {
    try {
      const hashedPass = await bcrypt.hash(password, 10);

      const existingUser = await db.user.findMany({
        where: { email: email },
      });

      if (existingUser.length) {
        return {
          code: 409,
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

      return {
        code: 201,
        status: "OK",
        message: "User created successfully",
        data: user,
      };
    } catch (error) {
      console.log(error);
    }
  });
