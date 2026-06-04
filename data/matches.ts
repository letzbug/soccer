export type Match={id:string;stage:string;group?:string;date:string;home:string;away:string;homeFlag:string;awayFlag:string;stadiumId:string;status:'scheduled'|'live'|'finished';score?:[number,number]}
export const matches:Match[]=[
{id:'m1',stage:'Gruppenphase',group:'A',date:'2026-06-11T21:00:00+02:00',home:'Mexico',away:'South Africa',homeFlag:'🇲🇽',awayFlag:'🇿🇦',stadiumId:'azteca',status:'scheduled'},
{id:'m2',stage:'Gruppenphase',group:'B',date:'2026-06-12T21:00:00+02:00',home:'Canada',away:'TBD',homeFlag:'🇨🇦',awayFlag:'🏳️',stadiumId:'bmo',status:'scheduled'},
{id:'m3',stage:'Gruppenphase',group:'D',date:'2026-06-12T23:00:00+02:00',home:'United States',away:'TBD',homeFlag:'🇺🇸',awayFlag:'🏳️',stadiumId:'sofi',status:'scheduled'},
{id:'m4',stage:'Gruppenphase',group:'F',date:'2026-06-20T18:00:00+02:00',home:'Netherlands',away:'Sweden',homeFlag:'🇳🇱',awayFlag:'🇸🇪',stadiumId:'lumen',status:'scheduled'},
{id:'m5',stage:'Round of 32',date:'2026-06-29T22:00:00+02:00',home:'1A',away:'3C/D/E',homeFlag:'🏆',awayFlag:'🏆',stadiumId:'att',status:'scheduled'},
{id:'m6',stage:'Finale',date:'2026-07-19T21:00:00+02:00',home:'Winner SF1',away:'Winner SF2',homeFlag:'🏆',awayFlag:'🏆',stadiumId:'metlife',status:'scheduled'}]
