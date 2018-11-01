import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IAppState } from './model/IAppState';
import { ISaveState } from './controller/saver/ISaveState';
import { IObservableObject } from 'mobx';
import { restoreAppState } from './controller/saver/restoreAppState';
import { saveAppStateAfterChange } from './controller/saver/saveAppStateAfterChange';
import { Root } from './view/Root/Root';

export class App {
    constructor(private rootElement: HTMLDivElement) {}

    public appState: IAppState & IObservableObject;
    public saveState: ISaveState & IObservableObject;
    run() {
        this.appState = restoreAppState();
        this.saveState = saveAppStateAfterChange(this.appState);

        ReactDOM.render(
            <Root
                {...{ appState: this.appState, saveState: this.saveState }}
            />,
            this.rootElement,
        );
    }
}
