import { IsInt, IsUUID } from 'class-validator';

export class NestedDto {
  @IsInt()
  a!: number;

  @IsUUID()
  b!: string;

  c!: boolean;
}
