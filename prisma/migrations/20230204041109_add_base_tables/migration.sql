-- CreateTable
CREATE TABLE "BaseCreature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "topName" TEXT NOT NULL,
    "midName" TEXT NOT NULL,
    "botName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Emotion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "hp" INTEGER NOT NULL DEFAULT 0,
    "spd" INTEGER NOT NULL DEFAULT 0,
    "phy" INTEGER NOT NULL DEFAULT 0,
    "mag" INTEGER NOT NULL DEFAULT 0,
    "ran" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Type" (
    "id" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id", "groupId")
);

-- CreateTable
CREATE TABLE "Rarity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "threshold" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "Creature" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "topId" INTEGER NOT NULL,
    "midId" INTEGER NOT NULL,
    "botId" INTEGER NOT NULL,
    "essenceId" INTEGER NOT NULL,
    CONSTRAINT "Creature_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Creature_topId_fkey" FOREIGN KEY ("topId") REFERENCES "BaseCreature" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Creature_midId_fkey" FOREIGN KEY ("midId") REFERENCES "BaseCreature" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Creature_botId_fkey" FOREIGN KEY ("botId") REFERENCES "BaseCreature" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Creature_essenceId_fkey" FOREIGN KEY ("essenceId") REFERENCES "BaseCreature" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BaseCreature_name_key" ON "BaseCreature"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");
