import http from "node:http";
import { json } from "./middlewares/json.js";

const users = []

const serve = http.createServer(async (req, res) =>{
const { method, url } = req;

await json(res, res)

if(method === "GET" && url === "/users"){
    return res
    .end(JSON.stringify(users))
}

if(method === "POST" && url === "/users"){
    const { name, email } = req.body
     
    users.push({
        id: 1,
        name,
        email
    })

    return res.writeHead(201).end()
}

return res.writeHead(404).end("not found")
});

serve.listen(3333);