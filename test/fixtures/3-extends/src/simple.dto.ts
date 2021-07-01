import { NestedDto } from './nested.dto';
import { IsInt, IsUUID } from 'class-validator';

export class SimpleDto extends NestedDto {
  randomProp!: boolean;
}
