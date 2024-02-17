import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserData } from '../model/user-data';

@Injectable({
    providedIn: 'root'
})
export class UserDataService {

    private userDatasCollection: AngularFirestoreCollection<UserData>;
    userDatas: Observable<UserData[]>;

    constructor(private readonly afs: AngularFirestore) {
        this.userDatasCollection = this.afs.collection<UserData>('user_data');
        this.userDatas = this.userDatasCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as UserData;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }

    getuserDatas(): Observable<UserData[]> {
        return this.userDatas;
    }

    getuserData(id: string): Observable<UserData> {
        return this.userDatasCollection.doc<UserData>(id).valueChanges();
    }

    adduserData(userData: UserData): Promise<DocumentReference> {
        return this.userDatasCollection.add(userData);
    }

    updateuserData(id: string, userData: UserData): Promise<void> {
        return this.userDatasCollection.doc(id).update(userData);
    }

    deleteuserData(id: string): Promise<void> {
        return this.userDatasCollection.doc(id).delete();
    }
}
