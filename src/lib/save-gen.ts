import datetimeDifference from "datetime-difference";
import { z } from "zod";

const SaveDataSchema = z.object({
	foo: z.string(),
	bar: z.number(),
	baz: z.boolean(),
	levels: z.array(z.number())
});

interface SaveData {
	foo: string;
	bar: number;
	baz: boolean;
	// Array of stars each level was completed with, undefined if not completed
	levels: number[];
}

export class SaveGenerator {
	static generateEmptySave(): SaveData {
		return {
			foo: "Hello World",
			bar: 5,
			baz: false,
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
}
