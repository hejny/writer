import { debounce } from 'lodash';
import { IObservableObject, observable, observe } from 'mobx';
import { ISaver, ISaveState } from './00-ISaver';
import 'firebase/database';

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

export class LocalStorageSaver<TAppState> implements ISaver<TAppState> {
    saveState: ISaveState & IObservableObject;
    appState: Promise<TAppState & IObservableObject>;

    constructor(
        firebaseDatabase: firebase.database.Database,
        documentId: string,
        createDefaultAppState: () => TAppState,
    ) {
        this.saveState = observable({
            loaded: null,
            updated: null,
            saved: null,
        });

        this.appState = new Promise((resolve) => {
            let appState: TAppState;
            try {
                const appModelSerialized = localStorage.getItem(
                    localStorageKey,
                );
                if (!appModelSerialized) {
                    throw new Error(
                        `In localStorage is not value ${localStorageKey}.`,
                    );
                }
                appState = JSON.parse(appModelSerialized);
            } catch (error) {
                console.warn(
                    `Error while trying to deserialize saved state - creating new state.`,
                );
                console.warn(error);
                // TODO: backup
                // TODO: migrations
                appState = createDefaultAppState();
            }
            resolve(observable(appState));
        });

        this.appState.then((appState) => {});
    }
}