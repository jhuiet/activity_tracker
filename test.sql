Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_
names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.re
lkind = 'r' and t.relname = 'activities' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): CREATE TABLE IF NOT EXISTS "users" ("employeeId" INTEGER , "firstName" VARCHAR(30) NOT NULL, "lastName" VARCHAR(30) NOT NULL, "email" VARCHAR(50), "password" VARCHAR(250)
NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("employeeId"));
Executing (default): SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_
names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.re
lkind = 'r' and t.relname = 'users' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
Executing (default): 
CREATE TABLE IF NOT EXISTS "activity_attendances" ("attendanceId" UUID , "user_userId" INTEGER NOT NULL REFERENCES "activities" ("activityId") ON DELETE CASCADE ON UPDATE
CASCADE, "activity_activityId" INTEGER NOT NULL REFERENCES "activities" ("activityId") ON DELETE CASCADE ON UPDATE CASCADE, "attendingStatus" VARCHAR(255) DEFAULT 'Not Attending', "createdAt"
TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "employeeId" INTEGER REFERENCES "users" ("employeeId") ON DELETE CASCADE ON UPDATE CASCADE, UNIQUE ("user_user
Id"), UNIQUE ("activity_activityId", "employeeId"), PRIMARY KEY ("attendanceId"));