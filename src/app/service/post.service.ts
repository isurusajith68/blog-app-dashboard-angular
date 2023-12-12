import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private storage: AngularFireStorage, private afs: AngularFirestore, private toastr: ToastrService) { }

  uploadImage(selectedImage: any, postData: any) {

    const filePath = `postImage/${Date.now()}`
    console.log(filePath)

    this.storage.upload(filePath, selectedImage)
      .then(() =>
        console.log("Post image upload successfully",
          this.storage.ref(filePath).getDownloadURL().subscribe((Url) => {
            postData.postImagPath = Url,
              this.afs.collection('posts').add(postData).then((docRef: any) =>
                this.toastr.success("Post Insert Successfully")
              )
          })
        ))
      .catch(err => console.log(err))

  }


}
