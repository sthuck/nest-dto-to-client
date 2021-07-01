import { IsInt, IsUUID } from 'class-validator';

export class SimpleDto {
  @IsInt()
  foo!: number;

  @IsUUID()
  bar!: string;

  optionalProp?: string;
}
