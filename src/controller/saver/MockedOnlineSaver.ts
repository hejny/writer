import { Observable } from 'rxjs/Observable';
import { AbstractSaver } from './AbstractSaver';
import { Observer } from 'rxjs/Observer';
import { forTime } from 'waitasecond';
import { IAppState } from 'src/model/IAppState';

export class MockedOnlineSaver<
    TAppState extends IAppState
> extends AbstractSaver<TAppState> {
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
        return Observable.create(async (observer: Observer<TAppState>) => {
            console.log('Create observable');
            while (true) {
                observer.next(appModel);
                await forTime(2500);

                appModel.message += `\ntest`;
            }
        });
    }

    appStateSaver(appState: TAppState) {
        // FIXME: DRY
        localStorage.setItem(this.localStorageKey, JSON.stringify(appState));
    }
}
