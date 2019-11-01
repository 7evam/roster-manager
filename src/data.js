const data = {
  teams:[
    {id: 'gbp', name: 'Green Bay Packers', league: 'NFL', slot: 'NFL', active: true},
    {id: 'clr', name: 'Colorado Rockies', league: 'MLB', slot: null, active: false},
    {id: 'lad', name: 'Los Angeles Dodgers', league: 'MLB', slot: 'MLB', active: false},
    {id: 'phe', name: 'Philadelphia Eagles', league: 'NFL', slot: 'FLEX', active: true},
    {id: 'sea', name: 'Seatle Seahawks', league: 'NFL', slot: null, active: true},
    {id: 'lal', name: 'Los Angeles Lakers', league: 'NBA', slot: 'NBA', active: true},
    {id: 'p76', name: 'Philadelphia 76ers', league: 'NBA', slot: null, active: true},
    {id: 'mon', name: 'Montreal Canadiens', league: 'NHL', slot: 'NHL', active: true}
  ],
  leagues: {
    'nfl': {id: 'nfl', name: 'NFL'},
    'mlb': {id: 'mlb', name: 'MLB'},
    'nhl': {id: 'nhl', name: 'NHL'},
    'nba': {id: 'nba', name: 'NBA'},
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'team',
      // orders tasks
      teamIds: ['lad','gbp','mon','p76','sea','lal','phe','clr'],
    }
  },
  // orders columns
  columnOrder: ['column-1'],
};

export default data
