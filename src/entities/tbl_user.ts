import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum UserRole {
    User = 1,
    Driver = 2,
    Supervisor = 3,
    Admin = 4,
}

export enum Status {
    ACTIVE = 1,
    INACTIVE = 2,
}

@Entity('tbl_user')
export class User {
    toObject() {
        throw new Error('Method not implemented.');
    }

    @PrimaryGeneratedColumn("uuid")
    id!: number;

    @Column({ length: 50, nullable: true })
    firstname?: string;

    @Column({ length: 50, nullable: true })
    lastname?: string;

    @Column({ length: 50, nullable: true })
    username!: string;

    @Column({ nullable: true })
    email!: string;

    @Column({ nullable: false })
    mobile?: string;

    @Column({ nullable: true })
    password!: string;

    @Column({ nullable: true, default: null })
    image?: string;

    @Column({ default: Status.INACTIVE })
    status!: number;

    @Column({ default: UserRole.User })
    role!: UserRole;

    @Column({ nullable: true })
    timezone?: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    })
    updatedAt!: Date;
}

export interface IUser {
    id: string;
    firstname?: string;
    lastname?: string;
    username: string;
    email?: string | null;
    mobile?: string | null;
    password?: string | null;
    image?: string | null;
    status?: number;
    role: number;
    createdAt: Date;
    updatedAt: Date;
}