import { RegexProcotocol } from "./protocol.regex";

export class RemoveSpaces extends RegexProcotocol{
    execute(str: string): string{
        return str.replace(/\s+/g, '');
    }
}  