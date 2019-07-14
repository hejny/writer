import { AbstractSaver } from './AbstractSaver';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export class LocalStorageSaver<TAppState> extends AbstractSaver<TAppState> {
    constructor(
        private localStorageKey: string,
        createDefaultAppState: () => TAppState, // FIXME: DRY
    ) {
        super(createDefaultAppState);
    }

    appStateLoader(): Observable<TAppState> {
        // FIXME: Why return type is not from inhereted class AbstractSaver

        console.log(this, this.localStorageKey);

        const appModelSerialized = localStorage.getItem(this.localStorageKey);
        if (!appModelSerialized) {
            throw new Error(
                `In localStorage is not value ${this.localStorageKey}.`,
            );
        }

        const appModel = JSON.parse(appModelSerialized) as TAppState;
        return Observable.create((observer: Observer<TAppState>) => {
            observer.next(appModel);
        });
    }

    appStateSaver(appState: TAppState) {
        // FIXME: DRY
        localStorage.setItem(this.localStorageKey, JSON.stringify(appState));
    }
}
