import './Message.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import { IAppState } from '../../model/IAppState';
import { IObservableObject } from 'mobx';

interface IMessageProps {
    appState: IAppState & IObservableObject;
}

export const Message = observer(({ appState }: IMessageProps) => {
    return (
        <div className="Message">
            <textarea
                defaultValue={appState.message}
                onChange={(event) => (appState.message = event.target.value)}
            />
        </div>
    );
});
