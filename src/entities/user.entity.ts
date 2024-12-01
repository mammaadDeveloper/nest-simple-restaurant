import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:50, unique:true})
    email: string;

    @Column({type:'varchar', nullable:true})
    phonenumber:string;

    @Column({type: 'varchar', length:100})
    password: string;

    @ManyToMany(()=>Role, (role) => role.id)
    @JoinTable()
    roles: Role[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
