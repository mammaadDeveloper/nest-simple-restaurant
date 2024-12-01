import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderId: number;

    @Column({ type: 'float', precision:10, scale:2 })
    amount: number;

    @Column()
    paymentMethod: 'cash' | 'card';

    @Column({ default: new Date() })
    paidAt: Date;

    @OneToOne(() => Order, (order) => order.id)

    order:Order;
}
