import * as React from 'react';
import { IAppState } from '../../model/IAppState';
import { IObservableObject } from 'mobx';
import { ISaveState } from '../../controller/saver/00-ISaver';
import { Message } from '../Message/Message';
import { observer } from 'mobx-react';
import './Root.css';

interface IAppProps {
    appState: IAppState & IObservableObject;
    saveState: ISaveState & IObservableObject;
}

export const Root = observer(({ appState, saveState }: IAppProps) => {
    return (
        <div className="Root">
            <Message {...{ appState }} />

            {/*
            <div>Char count: {appState.message.length}</div>
            <div>Word count: {appState.message.split(' ').length}</div>
            {saveState.saved && (
                <div>Saved at {saveState.saved.toString()}</div>
            )}
            */}
        </div>
    );
});
