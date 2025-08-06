export class CourseEntity {
	id: number;
	name: string;
	level: string;
	kind: string;
	shift: string;
	createdAt: Date;
	updatedAt: Date;
	enabled: boolean | null;

	constructor(name: string, level: string, kind: string, shift: string, createdAt: Date, updatedAt: Date) {
		this.name = name;
		this.level = level;
		this.kind = kind;
		this.shift = shift;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.enabled = true;
	}

	disable(): void {
		this.enabled = false;
	}
}
