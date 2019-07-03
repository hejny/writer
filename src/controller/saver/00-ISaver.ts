import { IObservableObject } from 'mobx';

export interface ISaveState {
    saving: boolean;
    loading: boolean;
    updated: Date | null;
    saved: Date | null;
}

export interface ISaver<TAppState> {
    saveState: ISaveState & IObservableObject;
    appState: Promise<TAppState & IObservableObject>;
}
