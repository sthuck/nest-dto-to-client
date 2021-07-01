import { NestedDto } from './nested.dto';
import { IsInt, IsUUID } from 'class-validator';

/**
 * I am a class jsdoc
 */
export class SimpleDto extends NestedDto {
  /** I am a prop js doc */
  randomProp!: boolean;
}
