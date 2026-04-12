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
)
.post(
  "/login",
  async ({ body, set }) => {
    try {
      const result = await UserService.login(body.email, body.password);
      return result;
    } catch (error: any) {
      set.status = 401;
      return {
        error: error.message,
      };
    }
  },
  {
    body: t.Object({
      email: t.String({ format: "email" }),
      password: t.String(),
    }),
  }
)
.get("/current", async ({ headers, set }) => {
  const authHeader = headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    set.status = 401;
    return {
      error: "Unauthorized: Missing or invalid token format",
    };
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = await UserService.getCurrentUser(token);
    return {
      user,
    };
  } catch (error: any) {
    set.status = 401;
    return {
      error: error.message,
    };
  }
});
