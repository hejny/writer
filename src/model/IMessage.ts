import * as uuidv4 from 'uuid/v4';

export interface IMessage{
    uuid: string;
    status: 'CURRENT'|'CLEARED'|'FEATURE';
    texts: {
        name: string;
        format: 'plain'|'html'|'markdown';//todo currently implemented only for plain text
        language: string;//todo maybe string enum
        content: string;
    }[];

    to: {
        name: string;
    }[];
}

export function createDefaultMessage():IMessage{
    
    return({
        uuid: uuidv4(),//Math.random().toString(),//todo UUID v4
        status: 'CURRENT',
        texts: [
            {
                name: 'MAIN',
                format: 'plain',
                language: 'en',
                content: ''
            }
        ],
        to: [],
    });
}