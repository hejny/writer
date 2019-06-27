import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import { IAppState } from './model/IAppState';
import { ISaveState } from './controller/saver/ISaveState';
import { IObservableObject } from 'mobx';
import { restoreAppState } from './controller/saver/restoreAppState';
import { saveAppStateAfterChange } from './controller/saver/saveAppStateAfterChange';
import { Root } from './view/Root/Root';

export class App {
    private firebaseApp: firebase.app.App;

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

        this.firebaseApp = firebase.initializeApp({
            apiKey: '<your-api-key>',
            authDomain: '<your-auth-domain>',
            databaseURL: '<your-database-url>',
            projectId: '<your-cloud-firestore-project>',
            storageBucket: '<your-storage-bucket>',
            messagingSenderId: '<your-sender-id>',
        });
    }
}
