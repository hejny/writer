/*
import { AbstractSaver } from './AbstractSaver';

export class MockedOnlineSaver<TAppState> extends AbstractSaver<TAppState> {
    constructor(
        private localStorageKey: string,
        createDefaultAppState: () => TAppState, // FIXME: DRY
    ) {
        super(createDefaultAppState);
    }

    appStateLoader(newState) {
        // FIXME: Why return type is not from inhereted class AbstractSaver

        console.log(this, this.localStorageKey);

        const appModelSerialized = localStorage.getItem(this.localStorageKey);
        if (!appModelSerialized) {
            throw new Error(
                `In localStorage is not value ${this.localStorageKey}.`,
            );
        }
        return JSON.parse(appModelSerialized);
    }

    appStateSaver(appState: TAppState) {
        // FIXME: DRY
        localStorage.setItem(this.localStorageKey, JSON.stringify(appState));
    }
}
*/
