import { app } from "./support/setupExpress.js";
import { query } from "./support/db.js";

//You should delete all of these route handlers and replace them according to your own requirements

app.get("/", (req, res) => {
    res.json({
        outcome: "success",
        message: "currently working on jokes api",
    });
});

app.get("/jokes", async (req, res) => {
    const dbResult = await query("select * from jokes");
    res.json(dbResult.rows);
});

app.get("/jokes/:id", async (req, res) => {
    const { id } = req.params;
    const dbResult = await query("SELECT * FROM jokes WHERE id = $1", [id]);
    if (dbResult.rowCount !== 1) {
        res.status(404).json({ error: `joke with id ${id} not found` });
        return;
    }
    res.json(dbResult.rows);
});

app.post("/jokes", async (req, res) => {
    const { setup, punchline } = req.body;
    const dbResult = await query(
        "INSERT INTO jokes (setup, punchline) VALUES ($1, $2) returning *",
        [setup, punchline]
    );
    if (dbResult.rowCount !== 1) {
        res.status(500).json({ error: "there was not 1 row" });
        return;
    }
    res.status(201).json({ outcome: "success" });
});

app.delete("/jokes/:id", async (req, res) => {
    const { id } = req.params;
    const dbResult = await query(
        "DELETE FROM jokes WHERE id = $1 returning *",
        [id]
    );
    if (dbResult.rowCount !== 1) {
        res.status(404).json({ error: `joke with id ${id} not found` });
        return;
    }
    res.json({ outcome: "item successfully deleted" });
});

// use the environment variable PORT, or 4000 as a fallback
const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
    console.log(
        `Your express app started listening on ${PORT}, at ${new Date()}`
    );
});
