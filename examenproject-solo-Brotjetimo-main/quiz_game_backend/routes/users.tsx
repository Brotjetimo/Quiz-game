import { SQL } from "bun";
import { addCORSHeaders } from "../index";

const mysql = new SQL("mysql://root:root@mysql:3306/quiz");

export const usersRoutes = {
    OPTIONS: () => addCORSHeaders(new Response(null, { status: 204 })),

    GET: async () => {
        try {
            const users = await mysql`SELECT * FROM users`;

            return addCORSHeaders(
                new Response(JSON.stringify(users), {
                    headers: { "Content-Type": "application/json" }
                })
            );
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            return addCORSHeaders(
                new Response(JSON.stringify({ error: "Database error: " + message }), { status: 500 })
            );
        }
    },

    POST: async (req: Request) => {
        try {
            const body = await req.json() as { username: string; password: string };
            
            // Bun uses bcrypt by default
            const hashedPassword = await Bun.password.hash(body.password);

            await mysql`
        INSERT INTO users (username, password)
        VALUES (${body.username}, ${hashedPassword})
      `;

            return addCORSHeaders(
                new Response(JSON.stringify({ success: true }), {
                    headers: { "Content-Type": "application/json" }
                })
            );

        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            return addCORSHeaders(
                new Response(JSON.stringify({ error: "Database error: " + message }), { status: 500 })
            );
        }
    },

    PUT: async (req: Request) => {
        try {
            const body = await req.json() as {
                user_id: number;
                username?: string;
                password?: string;
            };

            // If the field doesn't exist, it becomes NULL, COALESCE keeps the old value.
            await mysql`
        UPDATE users
        SET
          username = COALESCE(${body.username}, username),
          password = COALESCE(${body.password}, password)
        WHERE user_id = ${body.user_id}
      `;

            return addCORSHeaders(
                new Response(JSON.stringify({ success: true }), {
                    headers: { "Content-Type": "application/json" }
                })
            );

        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            return addCORSHeaders(
                new Response(JSON.stringify({ error: "Database error: " + message }), { status: 500 })
            );
        }
    },

    DELETE: async (req: Request) => {
        try {
            const body = await req.json() as { user_id: number };
            await mysql`
      DELETE FROM users
      WHERE user_id = ${body.user_id}
    `;

            return addCORSHeaders(
                new Response(JSON.stringify({ success: true }), {
                    headers: { "Content-Type": "application/json" }
                })
            );

        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            return addCORSHeaders(
                new Response(JSON.stringify({ error: "Database error: " + message }), { status: 500 })
            );
        }
    }
};