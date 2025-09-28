import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  SELLER = 'seller',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.SELLER,
    nullable: false,
  }) // Puede ser 'admin' o 'seller'
  role: UserRole;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  creation_date: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  constructor(
    username: string,
    password: string,
    name: string,
    surname: string,
    role: UserRole,
  ) {
    this.username = username;
    this.password = password;
    this.name = name;
    this.surname = surname;
    this.role = role;
    this.creation_date = new Date(); // Inicialización automática
  }
}
