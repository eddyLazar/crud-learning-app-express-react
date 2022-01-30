const server = require("./server");
const port = 5000;

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
