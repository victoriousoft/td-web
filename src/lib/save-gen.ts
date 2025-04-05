import datetimeDifference from "datetime-difference";
import { z } from "zod";

const SaveDataSchema = z.object({
	levels: z.array(z.number())
});

export interface SaveData {
	// Array of stars each level was completed with, undefined if not completed
	levels: number[];
}

export class SaveGenerator {
	static generateEmptySave(): SaveData {
		return {
			levels: []
		};
	}

	static parseFromJson(json: unknown): SaveData | null {
		const parsedData = SaveDataSchema.safeParse(json);
		if (!parsedData.success) return null;

		return parsedData.data;
	}

	static getRelativeDate(date: Date) {
		const now = new Date();

		const diff = datetimeDifference(now, date);

		if (diff.months > 1) {
			return `${diff.months} months ago`;
		} else if (diff.days > 1) {
			return `${diff.days} days ago`;
		} else if (diff.hours > 1) {
			return `${diff.hours} hours ago`;
		} else if (diff.minutes > 1) {
			return `${diff.minutes} minutes ago`;
		}

		return "Moments ago";
	}

	static getHighestUnlockedLevel(save: SaveData) {
		return save.levels.length - 1;
	}

	static passLevel(save: SaveData, level: number, stars: number) {
		if (level < 0 || stars < 0 || stars > 3) return save;

		if (save.levels.length <= level) {
			save.levels.push(stars);
		} else {
			save.levels[level] = stars;
		}

		return save;
	}
}
