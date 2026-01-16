import { RegexProcotocol } from "./protocol.regex";

export class OnlyLowerCase extends RegexProcotocol{
    execute(str: string): string{
        return str.replace(/[^a-z]+/g, '');
    }
}