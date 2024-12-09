# fastify-sequelize

Boilerplate with includes sequelize auto models

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.

# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL=postgresql://postgres:crayond@123@216.48.182.148:1998/lumel

- For Migrations and Seeders we use Prisma @prisma/migrate for SQL friendly migration

\*\* To Run the script for CSV

```bash
npm run csv
```

\*\*To Create a new migration

```bash
npm run migrate:create
```

\*\*To Run All Migrations

```bash
npm run  migrate
```

\*\*To Run All Seeders:

```bash
mpm run seed
```

```Curl for Get Revenue API And All the filters are added in the same API(Payloads: fromDate,toDate,product_id,category_id,region)
curl --location 'http://127.0.0.1:3000/api/v1/revenue/getRevenue?fromDate=2024-12-01&toDate=2024-12-09&category_id=1' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwNGYyZTZiNi1mMjgyLTQzYTQtYTJlZi1lNjA1NTQ5MmMxOTMiLCJidXNpbmVzc0lkIjoiNjk3NWQxMjktMDVmZi00NTcxLWJhOGMtYzhlNDdmZWM4NmMxIiwiYnVzaW5lc3NUeXBlIjoyLCJidXNpbmVzc1R5cGVOYW1lIjoiU3RvY2tpc3QiLCJyb2xlSWQiOjIsInJvbGVOYW1lIjoiQnVzaW5lc3MiLCJpYXQiOjE3Mjc0MjE4MjMsImV4cCI6MTcyNzU5NDYyM30.B1fQNsK9omm1iFqh4F3b5Hc-jFutZLtqNdjiIjDZLQ'
``` 
