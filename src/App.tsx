import * as firebase from 'firebase/app';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IAppState } from './model/IAppState';
import { IObservableObject } from 'mobx';
import { ISaveState } from './controller/saver/ISaveState';
import { restoreAppState } from './controller/saver/restoreAppState';
import { Root } from './view/Root/Root';
import { saveAppStateAfterChange } from './controller/saver/saveAppStateAfterChange';

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
            apiKey: 'AIzaSyB1UIYHsv3sl4pC8fPbkVghqBmfWdWwYDI',
            //authDomain: '<your-auth-domain>',
            databaseURL: 'https://writer-42b9d.firebaseio.com/',
            projectId: 'writer-42b9d',
            //storageBucket: '<your-storage-bucket>',
            //messagingSenderId: '<your-sender-id>',
        });

        const database = this.firebaseApp.database();

        database.ref('documents/test').set({
            text: 'test',
        });

        database.ref('documents/test').on('value', (event) => {
            console.log(event);
        });
    }
}
