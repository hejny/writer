import { IAppState } from 'src/model/IAppState';
import { IObservableObject, observable } from 'mobx';
import 'firebase/database';
/*import * as firebase from 'firebase/app';

export async function firebaseAppState(
    firebaseDatabase: firebase.database.Database,
    documentId: string,
): Promise<IAppState & IObservableObject> {
    /*
    firebaseDatabase.ref('documents/test').set({
        text: 'test',
    });

    firebaseDatabase.ref('documents/test').on('value', (event) => {
        console.log(event);
    });
    * /

    return observable({ message: 'teeeeeeeeest' });
}
*/
