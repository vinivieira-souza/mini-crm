-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "projectScope" TEXT,
    "companyName" TEXT,
    "hasSite" TEXT,
    "siteUrl" TEXT,
    "objective" TEXT,
    "estimatedValue" TEXT,
    "leadBehavior" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
