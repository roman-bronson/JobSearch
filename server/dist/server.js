import express from "express";
const port = 8000;
const app = express();
app.get('/', (req, res) => {
    res.send("hello from express + ts! and it works!");
});
app.get('/hi', (req, res) => {
    res.send("HIIIIIIIIIIIIIIIIIIIIIIIII");
});
app.listen(port, () => {
    console.log(`now listening on port ${port}`);
});
//# sourceMappingURL=server.js.map