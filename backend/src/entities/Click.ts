import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Url } from './Url';

@Entity()
export class Click {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  ipAddress!: string;

  @CreateDateColumn()
  clickedAt!: Date;

  @ManyToOne(() => Url, (url: Url) => url.clicks)
  @JoinColumn({ name: 'urlId' })
  url!: Url;

  @Column()
  urlId!: number;
} 