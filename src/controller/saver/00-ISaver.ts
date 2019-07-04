import { IObservableObject } from 'mobx';

export interface ISaveState {
    saving: boolean;
    loading: boolean;
    updated: Date | null;
    saved: Date | null;
}

export interface ISaver<TAppState> {
    saveState: ISaveState & IObservableObject; // TODO: This should have a better name
    appState: Promise<TAppState & IObservableObject>;
}
