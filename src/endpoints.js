export default [
    {
        endpoint: "GET /jokes",
        details: "Retreive all jokes",
    },
    {
        endpoint: "GET /jokes/{id}",
        details: "retrieve a joke by id",
    },
    {
        endpoint: "POST /jokes",
        details: "create a joke",
        format: { setup: "", punchline: "" },
    },
    {
        endpoint: "DELETE /jokes/{id}",
        details: "delete a joke by id",
    },
];
