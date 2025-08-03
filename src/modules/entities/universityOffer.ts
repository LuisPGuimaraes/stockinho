// import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
// import { Course } from './course';
// import { Offer } from './offer';

// @Entity('university_offers')
// export class UniversityOffer {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => Course, (course) => course.universityOffer, { nullable: false })
//   @JoinColumn({ name: 'course_id' })
//   course: Course;

//   @OneToMany(() => Offer, (offer) => offer.universityOffer)
//   @JoinColumn({ name: 'university_offer_id' })
//   offers: Offer[];


//   @Column('decimal', { nullable: true })
//   fullPrice: number;

//   @Column('int', { nullable: true })
//   maxPayments: number;

//   @Column('varchar', { length: 255, nullable: true })
//   enrollmentSemester: string;

//   @CreateDateColumn()
//   createdAt: Date;

//   @UpdateDateColumn()
//   updatedAt: Date;
// }