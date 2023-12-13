import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) { }

  uploadImage(selectedImage: any, postData: any, formStatus: string, postId: string) {


    const filePath = `postImage/${Date.now()}`
    console.log(filePath)

    this.storage.upload(filePath, selectedImage)
      .then(() =>
        console.log("Post image upload successfully",
          this.storage.ref(filePath).getDownloadURL().subscribe((Url) => {
            postData.postImagPath = Url;
            if (formStatus === 'Add') {
              this.saveData(postData)
            } else {
              this.updateData(postId, postData)
            }
          })
        ))
      .catch((error) => console.log(error))

  }

  saveData(postData: any) {
    this.afs.collection('posts').add(postData).then(docRef => {
      this.toastr.success("Post Insert Successfully");
      this.router.navigate(['/post']);
    });
  }

  loadData() {
    return this.afs.collection('posts')
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


  deleteData(id: string | undefined) {
    this.afs.collection('posts').doc(id).delete().then((docRef) =>
      this.toastr.warning("Post Delete Successfully")).catch((err) => console.log(err))
  }

  getPostById(id: string | undefined) {
    return this.afs.collection('posts').doc(id).valueChanges();
  }


  updateData(id: string | undefined, postData: any) {
    this.afs.collection('posts').doc(id).update(postData).then((docRef) => {
      this.toastr.success("Post Update Successfully");
      this.router.navigate(['/post']);
    }).catch((err) => console.log(err))
  }


  MarkFeatured(id: string | undefined, isFeatured: boolean) {
    this.afs.collection('posts').doc(id).update({ isFeatured: isFeatured }).then((docRef) => {
      this.toastr.success("Post Featured Successfully");
      this.router.navigate(['/post']);
    }).catch((err) => console.log(err))
  }


  RemoveFeatured(id: any, isFeatured: any) {
    this.afs.collection('posts').doc(id).update({ isFeatured: isFeatured }).then((docRef) => {
      this.toastr.success("Post Remove Featured Successfully");
      this.router.navigate(['/post']);
    }).catch((err) => console.log(err))
  }

}
