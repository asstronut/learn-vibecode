import { Elysia, t } from "elysia";
import { UserService } from "../services/user-service";

export const userRoutes = new Elysia({ prefix: "/api/users" }).post(
  "/",
  async ({ body, set }) => {
    try {
      const newUser = await UserService.register(
        body.name,
        body.email,
        body.password
      );

      set.status = 201;
      return {
        message: "User created successfully",
        data: newUser,
      };
    } catch (error: any) {
      if (error.message === "User already exists") {
        set.status = 409;
        return {
          message: "User already exists",
          data: null,
        };
      }

      set.status = 500;
      return {
        message: "Internal server error",
        data: null,
      };
    }
  },
  {
    body: t.Object({
      name: t.String(),
      email: t.String({ format: "email" }),
      password: t.String(),
    }),
  }
);
