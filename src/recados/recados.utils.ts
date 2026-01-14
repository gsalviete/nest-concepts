import { Injectable } from "@nestjs/common";

@Injectable()
export class RecadosUtils {
    reverseString(str: string){
        return str.split('').reverse().join('');  
    }
}