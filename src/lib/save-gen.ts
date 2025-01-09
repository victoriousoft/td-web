import { z } from "zod";

const SaveDataSchema = z.object({
	foo: z.string(),
	bar: z.number(),
	baz: z.boolean()
});

interface SaveData {
	foo: string;
	bar: number;
	baz: boolean;
}

export class SaveGenerator {
	static generateEmptySave(): SaveData {
		return {
			foo: "Hello World",
			bar: 5,
			baz: false
		};
	}

	static parseFromJson(json: unknown): SaveData | null {
		const parsedData = SaveDataSchema.safeParse(json);
		if (!parsedData.success) return null;

		return parsedData.data;
	}
}
