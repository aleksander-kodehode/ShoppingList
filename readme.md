# WIP

## Requirments:

Node, Vite, React, MySQL database

## Test it out localy

1.  Create a MySQL databse with the name of shoppingList
2.  sql user is root, and password is SqlPassword. Or call it whatever you like and change the .env file
3.  Copy sample.env into a .env file
4.  Run "npm i" in both the client and server directory
5.  In the server directory:
    1. Run either "prisma generate" or "npx prisma generate"
    2. Then run "npx prisma migrate dev --name init" to push the schema to the database
    3. Run "npm run dev" to start server
6.  In the client directory:
    1. just run npm run dev to start the client and access it through the port vite gives you.
