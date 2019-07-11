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

            try {
                this.appStateLoaderObservable = this.appStateLoader().share();

                const appState = await this.appStateLoaderObservable
                    .first()
                    .toPromise();
                if (appState) {
                    return observable(appState);
                }

                throw new Error();
            } catch (error) {
                return await this.createDefaultAppState();
            }
        })().then((appState) => observable(appState));
    }

    private watchAppState() {
        this.appState.then((appState) => {
            observe(
                appState,
                debounce(async () => {
                    this.saveState.saving = true;
                    await this.appStateSaver(appState); // TODO: Handle errors
                    this.saveState.saving = false;
                    this.saveState.saved = new Date();
                }, 500),
            );
        });
    }
}
