import { observable } from 'mobx';
import { IMessage, createDefaultMessage } from './IMessage';
import { IAppModelSerialized } from './IAppModelSerialized';

export class AppModel {
    @observable
    messages: IMessage[] = [];
    @observable
    saved: Date | null = null;

    static deserialize(source: IAppModelSerialized) {
        const appModel = new AppModel();
        appModel.messages = source.messages;
        return appModel;
    }

    serialize(): IAppModelSerialized {
        return {
            messages: this.messages,
        };
    }

    //todo import

    export(): string {
        /*
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
        */
        return this.messages
            .map(
                ({ status, uuid, to, texts }) =>
                    `=======================================================[${status}]==\n\nTo: ${to
                        .map((toItem) => toItem.name)
                        .join(', ')}\n\n` +
                    `${texts
                        .map(
                            ({ name, format, language, content }) =>
                                `----------------------------------------[${name}|${format}|${language}]--\n${content}`,
                        )
                        .join('\n\n')}`,
            )
            .join('\n\n');
    }

    newMessage() {
        this.messages.push(createDefaultMessage());
    }
}
