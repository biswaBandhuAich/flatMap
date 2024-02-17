import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from "@angular/fire/compat/firestore";
import { ApartmentData } from "../model/apartment-data";
import { Observable, map } from "rxjs";
import { Inject, Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class ApartmentDataService {
    private apartmentDatasCollection: AngularFirestoreCollection<ApartmentData>;
    apartmentDatas: Observable<ApartmentData[]>;

    constructor(private readonly afs: AngularFirestore) {
        this.apartmentDatasCollection = this.afs.collection<ApartmentData>('flat_data');
        this.apartmentDatas = this.apartmentDatasCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as ApartmentData;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }

    getapartmentDatas(): Observable<ApartmentData[]> {
        return this.apartmentDatas;
    }

    getapartmentData(id: string): Observable<ApartmentData> {
        return this.apartmentDatasCollection.doc<ApartmentData>(id).valueChanges();
    }

    addapartmentData(apartmentData: ApartmentData): Promise<DocumentReference> {
        return this.apartmentDatasCollection.add(apartmentData);
    }

    updateapartmentData(id: string, apartmentData: ApartmentData): Promise<void> {
        return this.apartmentDatasCollection.doc(id).update(apartmentData);
    }

    deleteapartmentData(id: string): Promise<void> {
        return this.apartmentDatasCollection.doc(id).delete();
    }
}