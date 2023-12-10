import { Component } from '@angular/core';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})

export class AddPostComponent {

  permalink : string = ''


  onTitleChanged($event: any) {
    const title = $event.target.value
    this.permalink = title.replace(/\s/g,'-')
    
  }
}
