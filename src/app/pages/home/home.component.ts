import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/auth.service';

declare var jQuery: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public authSvc: AuthService) { }

  ngOnInit(): void {
    (function ($) {
      $(document).ready(function () {
        $(".app-sidebar2").css("display", "block");
        $(".app-sidebar3").css("display", "block");
      });
    })(jQuery);

  }
}
