import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamDetailPage } from '../team-detail/team-detail';
import { StandingsPage } from '../standings/standings';
import { MyTeamsPage } from '../my-teams/my-teams';

/**
 * Generated class for the TeamhomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-teamhome',
  templateUrl: 'teamhome.html',
})
export class TeamhomePage {
  public teamDetailTab = TeamDetailPage;
  public standingsTab = StandingsPage;
  team: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.team = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamhomePage');
  }

  goToHome() {
    // this.navCtrl.push(MyTeamsPage);
    this.navCtrl.popToRoot();
  }

}
