import { NestedDto } from './nested.dto';
import { IsInt, IsUUID } from 'class-validator';
import { PickType, PartialType, OmitType } from '@nestjs/swagger';

export class SimpleDto extends PickType(NestedDto, ['a', 'c'] as const) {}

export class SimpleDto2 extends OmitType(NestedDto, ['a', 'c'] as const) {}
