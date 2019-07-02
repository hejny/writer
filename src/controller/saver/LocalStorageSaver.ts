import { debounce } from 'lodash';
import { IObservableObject, observable, observe } from 'mobx';
import { ISaver, ISaveState } from './00-ISaver';

export class LocalStorageSaver<TAppState> implements ISaver<TAppState> {
    saveState: ISaveState & IObservableObject;
    appState: Promise<TAppState & IObservableObject>;

    constructor(
        localStorageKey: string,
        createDefaultAppState: () => TAppState,
    ) {
        this.saveState = observable({
            loaded: null,
            updated: null,
            saved: null,
        });

        this.appState = new Promise((resolve, reject) => {
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

        this.appState.then((appState) => {
            this.saveState.loaded = new Date();
            this.saveState.updated = this.saveState.loaded;
            observe(
                appState,
                debounce(() => {
                    localStorage.setItem(
                        localStorageKey,
                        JSON.stringify(appState),
                    );
                    this.saveState.saved = new Date();
                }, 500),
            );
        });
    }
}
