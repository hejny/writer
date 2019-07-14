import { AbstractSaver } from './AbstractSaver';
import { forTime } from 'waitasecond';
import { IAppState } from 'src/model/IAppState';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'firebase/database';

export class FirebaseSaver<TAppState extends IAppState> extends AbstractSaver<
    TAppState
> {
    constructor(
        private firebaseDatabase: firebase.database.Database,
        private documentKey: string,
        createDefaultAppState: () => TAppState, // FIXME: DRY
    ) {
        // TODO: Test documentKey
        super(createDefaultAppState);
    }

    appStateLoader(): Observable<TAppState> {
        return Observable.create(async (observer: Observer<TAppState>) => {
            this.firebaseDatabase
                .ref(`documents/${this.documentKey}`)
                .on('value', (snapshot) => {
                    if (!snapshot.val()) return;
                    observer.next(snapshot.val().appState);
                });
        });
    }

    appStateSaver(appState: TAppState) {
        this.firebaseDatabase.ref(`documents/${this.documentKey}`).set({
            appState,
        });
    }
}
