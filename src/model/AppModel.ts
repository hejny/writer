import { observable } from 'mobx';
import { IMessage } from './IMessage';
import { IAppModelSerialized } from './IAppModelSerialized';

export class AppModel {

    @observable messages: IMessage[] = [];

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

    newMessage(){
        this.messages.push({
            text: '',
            archived: false
        })
    }

};
