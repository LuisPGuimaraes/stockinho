import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('courses')
export class CourseEntity {
	@PrimaryGeneratedColumn()
	id: string;

	@Column({ type: 'varchar', length: 255, nullable: false })
	name: string;

	@Column({ type: 'varchar', length: 255, nullable: false })
	level: string;

	@Column({ type: 'varchar', length: 255, nullable: false })
	kind: string;

	@Column({ type: 'varchar', length: 255, nullable: false })
	shift: string;

	@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
	updatedAt: Date;
}