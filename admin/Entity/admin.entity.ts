
import { Moderator } from "./moderator.entity";
import { ClientsEntity } from "./clients.entity";
import { WorkersEntity } from "./workers.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('admin')
export class AdminEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 150 })
    fastname: string;

    @Column({ length: 80 })
    lastname: string;

    @Column({ unique: true })
    email: string;

    @Column()
    contact: number;

    @Column()
    password: string;
    
    @Column({ nullable: true })
    filename: string;

    @OneToMany(() => Moderator, Moderator => Moderator.admin, { cascade: ["remove"] })
    moderator: Moderator[];

    @OneToMany(() => WorkersEntity, workers => workers.admin, { cascade: ["remove"] })
    workers: WorkersEntity[];

    @OneToMany(() => ClientsEntity, clients => clients.admin, { cascade: ["remove"] })
    clients: ClientsEntity[];

    @ManyToMany(() => Moderator, Moderator => Moderator.admin)
    @JoinTable()
    categories: Moderator[];
}
