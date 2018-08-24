import { observable } from 'mobx';
import { IMessage } from './IMessage';
import { IAppModelSerialized } from './IAppModelSerialized';

export class AppModel {

    @observable messages: IMessage[] = [];
    @observable saved: Date|null = null;

    static deserialize(source: IAppModelSerialized){
        const appModel = new AppModel();
        appModel.messages = source.messages;
        return appModel;
    }

    serialize():IAppModelSerialized{
        return({
            messages: this.messages
        });
    }

    //todo import

    export():string{
        return(
            this.messages
                .map(message=>message.text)
                .join('\n\n==================================================================\n\n')
        );
    }

    newMessage(){
        this.messages.push({
            text: '',
            archived: false
        })
    }

};
