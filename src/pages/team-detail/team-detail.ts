import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamhomePage } from '../teamhome/teamhome';
import { MyTeamsPage } from '../my-teams/my-teams';
import { EliteApiProvider } from '../../providers/elite-api/elite-api';
import * as _ from 'lodash'
import { GamePage } from '../game/game';
/**
 * Generated class for the TeamDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  team: any = {};
  games: any[];
  tourneyData: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public eliteApi: EliteApiProvider) {
    this.team = this.navParams.data;
    console.log(this.navParams.data);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad TeamDetailPage');
    this.tourneyData = this.eliteApi.getCurrentTourney();
    this.games = _.chain(this.tourneyData.games)
      .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
      .map(g => {
        let isTeam1 = (g.team1Id === this.team.id);
        let opponentName = isTeam1 ? g.team2 : g.team1;
        let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
        return {
          gameId: g.id,
          opponent: opponentName,
          time: Date.parse(g.time),
          location: g.location,
          locationUrl: g.locationUrl,
          scoreDisplay: scoreDisplay,
          homeAway: (isTeam1 ? "vs." : "at")
        };
      })
      .value();
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team2Score : team1Score);
      var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
      return winIndicator + teamScore + "-" + opponentScore;
    }
    else {
      return "";
    }
  }

  gameClicked($event, game) {
    let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }

  goHome() {
    // this.navCtrl.popTo(MyTeamsPage);
    this.navCtrl.parent.parent.popTo(MyTeamsPage);
  }

}
