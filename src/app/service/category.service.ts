import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private afs: AngularFirestore,
    private toastr: ToastrService
  ) { }


  saveDta(data: any) {
    this.afs.collection('categories')
      .add(data)
      .then((docRef) =>
        this.toastr.success("Data Insert Successfully")
      )
      .catch((err) => console.log(err))
  }


  loadData() {
    return this.afs.collection('categories')
      .snapshotChanges().pipe(
        map((action) => {
          return action.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  updateData(id: string | undefined, categoryData: Partial<unknown>) {
    this.afs.collection('categories')
      .doc(id).update(categoryData)
      .then((docRef) =>
        this.toastr.success("Data Update Successfully"))
      .catch((err) => console.log(err))
  }

  deleteData(id: string | undefined) {
    this.afs.collection('categories').doc(id).delete().then((docRef) =>
      this.toastr.success("Data Delete Successfully")).catch((err) => console.log(err))
  }
}
