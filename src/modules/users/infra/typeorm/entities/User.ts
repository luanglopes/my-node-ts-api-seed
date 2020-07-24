import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm'

import EUserRoles from '@modules/users/domain/enums/EUserRoles'

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ type: 'date' })
  birthday: Date

  @Column()
  phone: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({
    type: 'enum',
    enum: Object.values(EUserRoles),
    default: EUserRoles.user,
  })
  role: EUserRoles
}
