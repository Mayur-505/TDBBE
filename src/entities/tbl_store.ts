import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("tbl_store")
export class Store {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    storeName?: string;

    @Column()
    ownerId?: string;
}