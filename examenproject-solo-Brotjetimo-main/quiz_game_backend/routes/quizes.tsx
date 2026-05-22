import { SQL } from "bun";
import { addCORSHeaders } from "../index";

const mysql = new SQL("mysql://root:root@mysql:3306/quiz");

export const quizesRoutes = {
    OPTIONS: () => addCORSHeaders(new Response(null, { status: 204 })),

    GET: async () => {
        try {
            const quizes = await mysql`SELECT * FROM quizes`;

            return addCORSHeaders(
                new Response(JSON.stringify(quizes), {
                    headers: { "Content-Type": "application/json" }
                })
            );
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            return addCORSHeaders(
                new Response("Database error: " + message, { status: 500 })
            );
        }
    },
}