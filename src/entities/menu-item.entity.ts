import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity('menu_items')
export class MenuItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: 'float', precision:10, scale:2 })
    price: number;

    @Column()
    category: string;

    @Column({ default: true })
    isAvailable: boolean;

    @OneToMany(()=>Order, (order) => order.id)
    orders: Order[];
}
