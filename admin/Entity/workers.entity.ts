
import { AdminEntity } from "./admin.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('workers')
export class WorkersEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({length:100})
    fastname:string;

    @Column({length:111})
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

    @ManyToOne(() => AdminEntity, admin => admin.moderator, {onDelete:"CASCADE"})
    @JoinColumn({name:'adminID'})
    admin: AdminEntity;
}
