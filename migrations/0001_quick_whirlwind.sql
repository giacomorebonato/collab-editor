CREATE TABLE `files` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`content` blob,
	`completed` integer DEFAULT 0,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
--> statement-breakpoint
DROP TABLE `articles`;--> statement-breakpoint
DROP TABLE `users`;