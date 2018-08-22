import './App.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import { AppModel } from '../../model/AppModel';
import { Message } from '../Message/Message';

interface IAppProps {
    appModel: AppModel;
}

export const App = observer(({ appModel }: IAppProps) => {
    return (
        <div className="App">
            {appModel.messages.map((message,messageIterator)=>(
                <React.Fragment key={messageIterator}>
                    <Message {...{ message }} />
                </React.Fragment>
            ))}

            <button onClick={()=>appModel.newMessage()}>Add message</button>
        </div>
    );
});
