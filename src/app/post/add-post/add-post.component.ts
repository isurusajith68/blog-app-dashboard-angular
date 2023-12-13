import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/model/post';
import { CategoryService } from 'src/app/service/category.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})

export class AddPostComponent implements OnInit {
  permalink: string = ''
  imgSrc: string = '../../../assets/placeholder-image.jpg'
  selectImage: any
  categories: Array<any> | undefined
  postForm: FormGroup | any;
  post: any
  formStatus: string = 'Add'
  postId: string = ''
  RemoveFeatured: any;
  MarkFeatured: any;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute
  ) {

    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', Validators.required],
      excerpt: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      postImage: ['', Validators.required],
      content: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      if (params.id === undefined) return
      this.postService.getPostById(params.id).subscribe(post => {
        this.post = post;
        this.postId = params.id;
        this.formStatus = 'Edit';

        this.postForm.patchValue({
          title: this.post.title,
          permalink: this.post.permalink,
          excerpt: this.post.excerpt,
          category: this.post.category.categoryId + '-' + this.post.category.category,
          postImage: '',
          content: this.post.content
        });

        this.imgSrc = this.post.postImagPath
      });
    });

  }


  ngOnInit(): void {

    this.categoryService.loadData().subscribe(val => {
      this.categories = val
    })
  }


  get fc() {
    return this.postForm.controls
  }

  onTitleChanged($event: any) {
    const title = $event.target.value
    this.permalink = title.replace(/\s/g, '-')

  }

  showPrev($event: any) {
    const reader = new FileReader()
    reader.onload = (e: any) => {
      this.imgSrc = e.target.result
    }
    reader.readAsDataURL($event.target.files[0])
    this.selectImage = $event.target.files[0]
  }



  FormSubmit() {

    let spited = this.postForm.value.category.split('-')

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: spited[0],
        category: spited[1]
      },
      postImagPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    }
    this.postService.uploadImage(this.selectImage, postData, this.formStatus, this.postId)
    this.postForm.reset()
    this.imgSrc = '../../../assets/placeholder-image.jpg'
  }



}
