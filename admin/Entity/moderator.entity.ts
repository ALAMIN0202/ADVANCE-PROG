import { AdminEntity } from "./admin.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('moderator')
export class Moderator {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({length:150})
    fastName:string;

    @Column({length:80})
    lastName:string;

  
    @Column({unique:true})
    email:string;

    @Column()
    password:string;

    @Column()
    //phone: string;
    contact: number;
    @Column({nullable:true})
    adminID :number


    @ManyToOne(() => AdminEntity, admin => admin.moderator, {onDelete:"CASCADE"})
    @JoinColumn({name:'adminID'})
    admin: AdminEntity;


    @ManyToMany(() => AdminEntity, admin => admin.moderator)
    products: AdminEntity[];

}