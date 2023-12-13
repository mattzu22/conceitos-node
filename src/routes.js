import { randomUUID } from "node:crypto"

import { Database } from "./database.js";
import { buildRouterPath } from "./utils/build-route-path.js";

const database = new Database()

export const routes = [
  {
    method: "POST",
    path: buildRouterPath("/users"),
    handler: (req, res) => {
      const { name, email } = req.body;

      const user = {
        id: randomUUID(),
        name,
        email,
      };

      database.insert("users", user);

      return res.writeHead(201).end();
    },
  },
  {
    method: "GET",
    path: buildRouterPath("/users"),
    handler: (req, res) => {
      const users = database.select("users");

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "DELETE",
    path: buildRouterPath("/users/:id"),
    handler: (req, res) => {
        const { id } = req.params

        database.delete("users", id)
      return res.writeHead(204).end();
    },
  },
];
