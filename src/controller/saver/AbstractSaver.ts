import { debounce } from 'lodash';
import { IObservableObject, observable, observe } from 'mobx';
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

    hydrateAppStateHelper(
        ...appStateProviders: (() => Awaitable<TAppState>)[]
    ) {
        this.appState = (async () => {
            for (const appStateProvider of appStateProviders) {
                try {
                    const appState = await appStateProvider();
                    if (appState) {
                        return observable(appState);
                    }
                } catch (error) {
                    console.warn(
                        `Error while trying to deserialize saved state - creating new state.`,
                    );
                }
            }
            throw new Error(
                `Any of appStateProviders don\`t provided appState.`,
            );
        })();
    }

    watchAppState(appStateSaver: (appState: TAppState) => Awaitable<void>) {
        this.appState.then((appState) => {
            observe(
                appState,
                debounce(async () => {
                    this.saveState.saving = true;
                    await appStateSaver(appState); // TODO: Handle errors
                    this.saveState.saving = false;
                    this.saveState.saved = new Date();
                }, 500),
            );
        });
    }
}
