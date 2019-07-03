import { AbstractSaver } from './AbstractSaver';

export class LocalStorageSaver<TAppState> extends AbstractSaver<TAppState> {
    constructor(
        localStorageKey: string,
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
        super.watchAppState((appState) => {
            localStorage.setItem(localStorageKey, JSON.stringify(appState));
        });
    }
}
