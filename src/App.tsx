import * as firebase from 'firebase/app';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createDefaultAppState } from './model/createDefaultAppState';
import { IAppState } from './model/IAppState';
import { ISaver } from './controller/saver/00-ISaver';
import { LOCALSTORAGE_SAVE_KEY } from './config';
import { LocalStorageSaver } from './controller/saver/LocalStorageSaver';
import { Root } from './view/Root/Root';
import 'firebase/database';
import { MockedOnlineSaver } from './controller/saver/MockedOnlineSaver';

export class App {
    private saver: ISaver<IAppState>;
    private firebaseApp: firebase.app.App;

    constructor(private rootElement: HTMLDivElement) {}

    async run() {
        this.saver = new MockedOnlineSaver(
            LOCALSTORAGE_SAVE_KEY,
            createDefaultAppState,
        );
        // TODO:: Show the saving bar

        const appState = await this.saver.appState; // TODO:: do some UI loading

        ReactDOM.render(
            <Root
                {...{
                    appState,
                    saveState: this.saver.saveState,
                }}
            />,
            this.rootElement,
        );

        /*
        this.firebaseApp = firebase.initializeApp({
            apiKey: 'AIzaSyB1UIYHsv3sl4pC8fPbkVghqBmfWdWwYDI',
            //authDomain: '<your-auth-domain>',
            databaseURL: 'https://writer-42b9d.firebaseio.com/',
            projectId: 'writer-42b9d',
            //storageBucket: '<your-storage-bucket>',
            //messagingSenderId: '<your-sender-id>',
        });

        const database = this.firebaseApp.database();
        */
    }
}
