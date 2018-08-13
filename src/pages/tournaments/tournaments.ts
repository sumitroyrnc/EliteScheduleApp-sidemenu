import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamsPage } from '../teams/teams';
import { EliteApiProvider } from '../../providers/elite-api/elite-api';

/**
 * Generated class for the TournamentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {

  public tournaments: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public eliteApi: EliteApiProvider,
    public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad TournamentsPage');
    let loader = this.loadingController.create(
      { content: 'Getting Tournaments...' }
    );
    loader.present().then(() => {
      this.eliteApi.getTournaments().then(
        x => {
          this.tournaments = x;
          loader.dismiss();
        }
      );
    });

  }

  navigateBack() {
    this.navCtrl.pop();
  }

  itemTapped($events, tourney) {
    this.navCtrl.push(TeamsPage, tourney);
  }

}
