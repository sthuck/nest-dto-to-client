import { NestedDto } from './nested.dto';
import { IsInt, IsUUID } from 'class-validator';
import { PickType, PartialType, OmitType } from '@nestjs/swagger';

export class SimpleDto2 extends PickType(PartialType(NestedDto), ['a', 'c']) {}
export class SimpleDto extends PartialType(PickType(NestedDto, ['a', 'c'])) {}
