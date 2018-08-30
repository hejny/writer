import * as uuidv4 from 'uuid/v4';

//todo split into more files

export type MessageStatus = 'CURRENT' | 'FINISHED' | 'FEATURE';
export type MessageTextFormat = 'plain' | 'html' | 'markdown'; //todo currently implemented only for plain text
export type MessageTextLanguage = 'en' | 'cs'; //todo currently implemented only for en and cs

//todo split into more files
export const MessageStatusDictionary: {
    value: MessageStatus;
    name: string;
}[] = [
    {
        value: 'CURRENT',
        name: 'Current',
    },
    {
        value: 'FINISHED',
        name: 'Finished',
    },
    {
        value: 'FEATURE',
        name: 'In feature',
    },
];

//todo split into more files
export const MessageTextFormatDictionary: {
    value: MessageTextFormat;
    name: string;
}[] = [
    {
        value: 'plain',
        name: 'Text',
    },
];

//todo split into more files
export const MessageTextLanguageDictionary: {
    value: MessageTextLanguage;
    name: string;
}[] = [
    {
        value: 'en',
        name: 'English',
    },
    {
        value: 'cs',
        name: 'Čeština',
    },
];

export interface IMessageToItem {
    uuid: string;
    name: string;
}

export interface IMessageText {
    uuid: string;
    name: string;
    format: MessageTextFormat;
    language: MessageTextLanguage; //todo maybe string enum
    content: string;
}

export interface IMessage {
    uuid: string;
    status: MessageStatus;
    texts: IMessageText[];

    to: IMessageToItem[];
}

export function createDefaultMessage(): IMessage {
    return {
        uuid: uuidv4(),
        status: 'CURRENT',
        texts: [
            createDefaultMessageText('Task'),
            createDefaultMessageText('Message'),
        ],
        to: [createDefaultToItem()],
    };
}

export function createDefaultMessageText(name = ''): IMessageText {
    return {
        uuid: uuidv4(),
        name,
        format: 'plain',
        language: 'en',
        content: '',
    };
}

export function createDefaultToItem(): IMessageToItem {
    return {
        uuid: uuidv4(),
        name: '',
    };
}
