import { debounce } from 'lodash';
import { IObservableObject, observable, observe } from 'mobx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/first';
import { forImmediate } from 'waitasecond';
import { ISaver, ISaveState } from './00-ISaver';

type Awaitable<T> = T | PromiseLike<T>; // TODO: Infuture this can be native see https://github.com/microsoft/TypeScript/issues/31394 if not rename it to Promisable

export class AbstractSaver<TAppState> implements ISaver<TAppState> {
    saveState: ISaveState & IObservableObject = observable({
        saving: false,
        loading: true,
        updated: null,
        saved: null,
    });
    appState: Promise<TAppState & IObservableObject>;

    private appStateLoaderObservable: Observable<TAppState>;

    appStateLoader(): Observable<TAppState> {
        throw new Error(`"appStateLoader" should be overwritten.`);
    }
    appStateSaver(appState: TAppState): Awaitable<void> {
        throw new Error(`"appStateSaver" should be overwritten.`);
    }

    constructor(private createDefaultAppState: () => Awaitable<TAppState>) {
        this.hydrateAppStateHelper();
        this.watchAppState();
    }

    private hydrateAppStateHelper() {
        this.appState = (async () => {
            await forImmediate();
            const appState = observable(await this.createDefaultAppState());

            this.appStateLoader().subscribe((newAppState) => {
                console.log(newAppState);
                // TODO: to function
                for (const key of Object.keys(newAppState)) {
                    appState[key] = newAppState[key];
                }
            });

            return appState;
        })();
    }

    private watchAppState() {
        this.appState.then((appState) => {
            observe(
                appState,
                debounce(async () => {
                    console.log('saving');

                    this.saveState.saving = true;
                    await this.appStateSaver(appState); // TODO: Handle errors
                    this.saveState.saving = false;
                    this.saveState.saved = new Date();
                }, 500),
            );
        });
    }
}
