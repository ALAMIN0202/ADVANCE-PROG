import { AdminEntity } from "./admin.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('clients')
export class ClientsEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({length:150})
    fastname:string;

    @Column({length:80})
    lastname:string;

    @Column({unique:true})
    email:string;

    @Column()
    contact:number;

    @Column()
    password:string;

    @Column({nullable:true})
    photoFileName:string;
    
    @Column({nullable:true})
    adminID :number

    @ManyToOne(() => AdminEntity, admin => admin.clients, {onDelete:"CASCADE"})
    @JoinColumn({name:'adminID'})
    admin: AdminEntity;
}