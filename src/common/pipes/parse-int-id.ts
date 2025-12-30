import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class ParseIntIdPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if( metadata.type !== 'param' || metadata.data !== 'id' ) {
            return value;
        }
        const id = Number(value);
        if (isNaN(id)) {
            throw new BadRequestException('Invalid ID');
        }
        if (id <= 0) {
            throw new BadRequestException('ID must be a positive integer');
        }

        return id;
    }
}