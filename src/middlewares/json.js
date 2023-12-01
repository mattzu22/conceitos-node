export async function json(req, res) {
  const buffers = [];

  for await (const chunck of req) {
    buffers.push(chunck);
  }

  try {
    //adicionar uma nova propriedade no req
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null;
  }

  res.setHeader("content-type", "aplication/json")
}

