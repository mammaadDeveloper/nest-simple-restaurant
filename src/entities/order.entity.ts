import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MenuItem } from "./menu-item.entity";
import { Payment } from "./payment.entity";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customerName: string;

    @Column()
    customerPhone: string;

    @Column()
    status: "pending" | "completed" | "canceled";

    @OneToOne(()=>Payment, (payment) => payment.id)
    payment: Payment;

    @ManyToMany(() => MenuItem, (menuItem) => menuItem.id)
    @JoinTable()
    items: MenuItem[];
}
