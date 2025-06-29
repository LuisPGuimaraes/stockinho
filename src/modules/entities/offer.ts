import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UniversityOffer } from "./universityOffer";

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UniversityOffer, (universityOffer) => universityOffer.offers, { eager: true })
  @JoinColumn({ name: 'university_offer_id' })
  universityOffer: UniversityOffer;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  discountPercentage: number;

  @Column({ type: 'boolean', nullable: true })
  enabled: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
