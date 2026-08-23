CREATE TABLE `providerDrafts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerId` int NOT NULL,
	`status` enum('draft') NOT NULL DEFAULT 'draft',
	`processingConsent` int NOT NULL DEFAULT 0,
	`publicListingConsent` int NOT NULL DEFAULT 0,
	`content` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `providerDrafts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `providerDrafts_ownerId_idx` ON `providerDrafts` (`ownerId`);