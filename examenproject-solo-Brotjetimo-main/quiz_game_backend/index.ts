import { questionRoutes } from "./routes/questions";
import { quizesRoutes } from "./routes/quizes";
import { usersRoutes } from "./routes/users";

// Helper function to add CORS headers to a response so my localhost frontend does not get blocked
export const addCORSHeaders = (response: Response) => {
  const headers = new Headers(response.headers);

  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  return new Response(response.body, {
    status: response.status,
    headers
  });
};

const server = Bun.serve({
  // `routes` requires Bun v1.2.3+
  routes: {
    // Static routes
    "/status": new Response("OK"),

    // Dynamic routes
    "/quizes": quizesRoutes,
    "/questions": questionRoutes,
    "/users": usersRoutes,

    // Wildcard route for all routes that start with "/api/" and aren't otherwise matched
    "/api/*": Response.json({ message: "Not found" }, { status: 404 }),

    // Serve a file by lazily loading it into memory
    "/favicon.ico": Bun.file("./favicon.ico"),
  },

  // (optional) fallback for unmatched routes:
  // Required if Bun's version < 1.2.3
  fetch(req) {
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server running at ${server.url}`);