CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(255),
	"isComplete" BOOLEAN
);

DROP TABLE "tasks";

SELECT * FROM "tasks";