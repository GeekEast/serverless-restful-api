import { Model, Table, Column, PrimaryKey, Sequelize, AutoIncrement, DataType, AllowNull } from 'sequelize-typescript';


@Table({
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
  underscored: true,
})
export class Todo extends Model<Todo> {
  @Column({
    type: DataType.STRING
  })
  task?: string;

  @Column({
    defaultValue: false,
    type: DataType.BOOLEAN
  })
  complete?: boolean;
}