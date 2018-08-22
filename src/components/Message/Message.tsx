import './Message.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import { IMessage } from '../../model/IMessage';

interface IMessageProps {
    message: IMessage;
}

export const Message = observer(({ message }: IMessageProps) => {
    return (
        <div className="Message">
            <textarea defaultValue={message.text} onChange={(event)=>message.text=event.target.value} />

            <ul className="statistics">
                <li>{message.text.length} chars</li>
                <li>{message.text.length} words</li>
                <li>{message.text.length} sentences</li>
            </ul>
        </div>
    );
});
