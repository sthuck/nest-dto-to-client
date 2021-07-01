import { IsInt, IsUUID } from 'class-validator';

export class NestedDto {
  /** I am a prop js doc */
  @IsInt()
  a!: number;

  @IsUUID()
  b!: string;
}
