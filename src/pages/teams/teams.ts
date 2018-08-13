import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamhomePage } from '../teamhome/teamhome';
import { EliteApiProvider } from '../../providers/elite-api/elite-api';

/**
 * Generated class for the TeamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public eliteApi: EliteApiProvider,
    public loadingController: LoadingController) {
  }

  // Earlier hardcoded values
  // public teams = [
  //   { id: 1, name: "ELite" },
  //   { id: 2, name: "Team takeover" },
  //   { id: 3, name: "DC Thunder" },
  // ]
  public teams = [];
  ionViewDidLoad() {
    // console.log('ionViewDidLoad TeamsPage');
    let loader = this.loadingController.create(
      {
        content: 'Getting Teams...'
        , spinner: 'dots'
      }
    );

    let selectedTourney = this.navParams.data;
    loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTourney.id).subscribe(
        data => {
          console.log(data);
          this.teams = data.teams;
          loader.dismiss();
        }
      );
    });

  }

  itemTapped($event, team) {
    this.navCtrl.push(TeamhomePage, team);
  }

}
