// import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
// import { UniversityOffer } from './universityOffer';

// @Entity('courses')
// export class Course {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @OneToMany(() => UniversityOffer, (universityOffer) => universityOffer.course)
//   @JoinColumn({ name: 'university_offer_id' })
//   universityOffer: UniversityOffer;

//   @Column('varchar', { length: 255, nullable: false })
//   name: string;

//   @Column('varchar', { length: 255, nullable: true })
//   level: string;

//   @Column('varchar', { length: 255, nullable: true })
//   kind: string;

//   @Column('varchar', { length: 255, nullable: true })
//   shift: string;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;
// }