import app from "./app";

import nconf from "nconf";
nconf.file({ file: "./config.json" });

const port = nconf.get("port") || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
