import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { RegexProcotocol } from "./protocol.regex";
import { OnlyLowerCase } from "./only-lowercase.regex";
import { RemoveSpaces } from "./remove-spaces.regex";

export type ClassNames = 'RemoveSpaces' | 'OnlyLowerCase';

@Injectable()
export class RegexFactory{
    create (className: ClassNames) : RegexProcotocol{ 
    switch (className){
        case 'OnlyLowerCase' :
            return new OnlyLowerCase();
        case 'RemoveSpaces':
            return new RemoveSpaces();
        default:
            throw new InternalServerErrorException(
                `no class found for ${className}`
            )
    }
}
}