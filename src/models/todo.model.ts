import { Table, Model, Column, CreatedAt, UpdatedAt, PrimaryKey, DeletedAt, AutoIncrement, AllowNull, Unique, Default } from 'sequelize-typescript';

@Table({
  underscored: true,
  timestamps: true,
})
export default class Todo extends Model<Todo> {
  @PrimaryKey
  @Column
  id!: string;

  @Column
  task?: string;

  @Default(false)
  @Column
  complete?: boolean;

  @CreatedAt
  @Column
  created_at!: Date;

  @UpdatedAt
  @Column
  updated_at!: Date;

  @AllowNull
  @DeletedAt
  @Column
  deleted_at?: Date;
}