# activity_tracker

To start:
Using PostgresSQL: create a role (username/password) and give them permissions to a database.

Update the .env file accordingly.


createdb -U postgres [dbname]
psql [dbname] -- starts the db

CREATE USER [name] with encrypted password '[password]';
ALTER ROLE [name] with [];


decent express/node.js guide

https://www.robinwieruch.de/postgresql-express-node-rest-api/

swagger:

https://swagger.io/docs/specification/basic-structure/


create api to update user points
create api to modify if the user is enabled (able to access the app)
## add a field to user: verified (set to false initially until a user updates
