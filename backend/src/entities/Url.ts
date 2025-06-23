import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Click } from './Click';

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  originalUrl!: string;

  @Column({ unique: true })
  shortUrl!: string;

  @Column({ nullable: true, unique: true })
  alias?: string;

  @Column({ nullable: true, type: 'timestamp' })
  expiresAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Click, (click: Click) => click.url, { onDelete: 'CASCADE' })
  clicks!: Click[];
} 