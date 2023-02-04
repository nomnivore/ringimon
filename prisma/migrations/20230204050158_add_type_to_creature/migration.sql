/*
  Warnings:

  - Added the required column `typeGroupId` to the `Creature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `Creature` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Creature" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "topId" INTEGER NOT NULL,
    "midId" INTEGER NOT NULL,
    "botId" INTEGER NOT NULL,
    "essenceId" INTEGER NOT NULL,
    "typeGroupId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    CONSTRAINT "Creature_typeGroupId_typeId_fkey" FOREIGN KEY ("typeGroupId", "typeId") REFERENCES "Type" ("id", "groupId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Creature_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Creature_topId_fkey" FOREIGN KEY ("topId") REFERENCES "BaseCreature" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Creature_midId_fkey" FOREIGN KEY ("midId") REFERENCES "BaseCreature" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Creature_botId_fkey" FOREIGN KEY ("botId") REFERENCES "BaseCreature" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Creature_essenceId_fkey" FOREIGN KEY ("essenceId") REFERENCES "BaseCreature" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Creature" ("botId", "createdAt", "essenceId", "id", "midId", "topId", "updatedAt", "userId") SELECT "botId", "createdAt", "essenceId", "id", "midId", "topId", "updatedAt", "userId" FROM "Creature";
DROP TABLE "Creature";
ALTER TABLE "new_Creature" RENAME TO "Creature";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
