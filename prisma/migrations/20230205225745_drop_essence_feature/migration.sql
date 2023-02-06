/*
  Warnings:

  - You are about to drop the column `essenceId` on the `Creature` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Creature" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT,
    "topId" INTEGER NOT NULL,
    "midId" INTEGER NOT NULL,
    "botId" INTEGER NOT NULL,
    "typeGroupId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "emotionId" INTEGER NOT NULL,
    "rarityId" INTEGER NOT NULL,
    CONSTRAINT "Creature_typeGroupId_typeId_fkey" FOREIGN KEY ("typeGroupId", "typeId") REFERENCES "Type" ("id", "groupId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Creature_emotionId_fkey" FOREIGN KEY ("emotionId") REFERENCES "Emotion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Creature_rarityId_fkey" FOREIGN KEY ("rarityId") REFERENCES "Rarity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Creature_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Creature_topId_fkey" FOREIGN KEY ("topId") REFERENCES "BaseCreature" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Creature_midId_fkey" FOREIGN KEY ("midId") REFERENCES "BaseCreature" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Creature_botId_fkey" FOREIGN KEY ("botId") REFERENCES "BaseCreature" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Creature" ("botId", "createdAt", "emotionId", "id", "midId", "rarityId", "topId", "typeGroupId", "typeId", "updatedAt", "userId") SELECT "botId", "createdAt", "emotionId", "id", "midId", "rarityId", "topId", "typeGroupId", "typeId", "updatedAt", "userId" FROM "Creature";
DROP TABLE "Creature";
ALTER TABLE "new_Creature" RENAME TO "Creature";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
