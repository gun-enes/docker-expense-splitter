db.createUser(
    {
        user: "rootuser",
        pwd: "rootpassword",
        roles: [
            {
                role: "readWrite",
                db: "test"
            }
        ]
    }
);
db.createCollection("test");
