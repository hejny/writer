import './Root.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import { Message } from '../Message/Message';
import { IAppState } from '../../model/IAppState';
import { IObservableObject } from 'mobx';
import { ISaveState } from '../../controller/saver/ISaveState';

interface IAppProps {
    appState: IAppState & IObservableObject;
    saveState: ISaveState & IObservableObject;
}

export const Root = observer(({ appState, saveState }: IAppProps) => {
    return (
        <div className="Root">
            <Message {...{ appState }} />

            <div>Char count: {appState.message.length}</div>
            <div>Word count: {appState.message.split(' ').length}</div>
            {saveState.saved && (
                <div>Saved at {saveState.saved.toString()}</div>
            )}
        </div>
    );
});
