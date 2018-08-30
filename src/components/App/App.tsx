import './App.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import { AppModel } from '../../model/AppModel';
import { Message } from '../Message/Message';
import { Toolbar } from '../Toolbar/Toolbar';

interface IAppProps {
    appModel: AppModel;
    save: () => void;
    download: () => void;
}

export const App = observer(({ appModel, save, download }: IAppProps) => {
    return (
        <div className="App">
            <Toolbar {...{ appModel, save, download }} />
            {appModel.messages
                .sort((message1, message2) => {
                    if (
                        message1.status === 'CURRENT' &&
                        message2.status !== 'CURRENT'
                    ) {
                        return -1;
                    } else if (
                        message2.status === 'CURRENT' &&
                        message1.status !== 'CURRENT'
                    ) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
                .map((message) => (
                    <React.Fragment key={message.uuid}>
                        <Message {...{ message }} remove={()=>appModel.messages = appModel.messages.filter((message2)=>message2!==message)} />
                    </React.Fragment>
                ))}
        </div>
    );
});
