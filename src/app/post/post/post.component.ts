import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {




  postArray: any = []

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.loadData().subscribe(val => {
      this.postArray = val;
      console.log(val)
    })

  }


  deletePost(arg0: any) {
    this.postService.deleteData(arg0)
  }

  MarkFeatured(id: any, isFeatured: any) {
    this.postService.MarkFeatured(id, isFeatured)
  }
  RemoveFeatured(id: any , isFeatured:any) {
    this.postService.RemoveFeatured(id, isFeatured)
  }
}

