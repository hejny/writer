import './App.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import { AppModel } from '../../model/AppModel';
import { Message } from '../Message/Message';
import { Toolbar } from '../Toolbar/Toolbar';

interface IAppProps {
    appModel: AppModel;
    save: ()=>void;
    download: ()=>void;
}

export const App = observer(({ appModel, save, download }: IAppProps) => {
    return (
        <div className="App">
            <Toolbar {...{ appModel,save, download }}/>
            {appModel.messages.map((message,messageIterator)=>(
                <React.Fragment key={messageIterator}>
                    <Message {...{ message }} />
                </React.Fragment>
            ))}
        </div>
    );
});
