import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Store } from "./tbl_store";


@Entity({ name: 'tbl_product' })
export class TblProduct {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    productId?: string;

    @Column()
    productName?: string;

    @Column()
    price?: number;

    @ManyToOne(() => Store)
    @JoinColumn({ name: 'storeId' })
    store?: Store;
}