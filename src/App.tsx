import * as firebase from 'firebase/app';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import { createDefaultAppState } from './model/createDefaultAppState';
import { FirebaseSaver } from './controller/saver/FirebaseSaver';
import { IAppState } from './model/IAppState';
import { ISaver } from './controller/saver/00-ISaver';
import { LOCALSTORAGE_SAVE_KEY } from './config';
import { LocalStorageSaver } from './controller/saver/LocalStorageSaver';
import { MockedOnlineSaver } from './controller/saver/MockedOnlineSaver';
import { Root } from './view/Root/Root';
import 'firebase/database';

export class App {
    private saver: ISaver<IAppState>;
    private firebaseApp: firebase.app.App;

    constructor(private rootElement: HTMLDivElement) {}

    async run() {
        const documentKey = location.pathname.split('/').filter((x) => x)[0];

        if (!documentKey) {
            location.pathname = `/${uuid.v4()}`;
        }

        this.firebaseApp = firebase.initializeApp({
            apiKey: 'AIzaSyB1UIYHsv3sl4pC8fPbkVghqBmfWdWwYDI',
            //authDomain: '<your-auth-domain>',
            databaseURL: 'https://writer-42b9d.firebaseio.com/',
            projectId: 'writer-42b9d',
            //storageBucket: '<your-storage-bucket>',
            //messagingSenderId: '<your-sender-id>',
        });
        const database = this.firebaseApp.database();

        this.saver = new FirebaseSaver(
            database,
            documentKey,
            createDefaultAppState(documentKey),
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
        

        
        */
    }
}
