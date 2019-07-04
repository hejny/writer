/*

import 'firebase/database';
import { AbstractSaver } from './AbstractSaver';

export class LocalStorageSaver<TAppState> extends AbstractSaver<TAppState> {
    constructor(
        firebaseDatabase: firebase.database.Database,
        documentId: string,
        createDefaultAppState: () => TAppState,
    ) {
        super();
        // TODO: Is it here better to use super or this
        super.hydrateAppStateHelper(() => {
            const appModelSerialized = localStorage.getItem(localStorageKey);
            if (!appModelSerialized) {
                throw new Error(
                    `In localStorage is not value ${localStorageKey}.`,
                );
            }
            return JSON.parse(appModelSerialized);
        }, createDefaultAppState);
        /*super.watchAppState((appState) => {
            localStorage.setItem(localStorageKey, JSON.stringify(appState));
        });* /
    }
}

/*import * as firebase from 'firebase/app';

export async function firebaseAppState(
    firebaseDatabase: firebase.database.Database,
    documentId: string,
): Promise<IAppState & IObservableObject> {
    /*
    firebaseDatabase.ref('documents/test').set({
        text: 'test',
    });

    firebaseDatabase.ref('documents/test').on('value', (event) => {
        console.log(event);
    });
    * /

    return observable({ message: 'teeeeeeeeest' });
}
*/
