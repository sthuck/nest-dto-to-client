import { NestedDto } from './nested.dto';
import { IsInt, IsUUID } from 'class-validator';
import { PickType, PartialType } from '@nestjs/swagger';

export class SimpleDto extends PartialType(NestedDto) {}
