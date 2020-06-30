import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {StarService} from 'src/app/services/star.service';
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.scss']
})
export class StarReviewComponent implements OnInit {

  @Input() userId;
  @Input() productId;

  stars: Observable<any>;

  constructor(
    private starService: StarService
  ) {
  }

  ngOnInit(): void {
  }

  starHandler(value) {
    this.starService.setStar(this.userId, this.productId, value);
  }

}
