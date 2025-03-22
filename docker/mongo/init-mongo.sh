#!/bin/bash
mongosh --eval '
use admin;
db.createUser({
  user: "admin",
  pwd: "admin",
  roles: [
    { role: "root", db: "admin" },
    { role: "dbOwner", db: "communication-system" },
    { role: "readWrite", db: "communication-system" },
    { role: "dbAdmin", db: "communication-system" }
  ]
});
'
