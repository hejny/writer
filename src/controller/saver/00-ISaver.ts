import { IObservableObject } from 'mobx';

export interface ISaveState {
    loaded: Date | null;
    updated: Date | null;
    saved: Date | null;
}

export interface ISaver<TAppState> {
    saveState: ISaveState & IObservableObject;
    appState: Promise<TAppState & IObservableObject>;
}
