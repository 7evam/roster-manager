const data = {
  teams: {
    'gbp': {id: 'gbp', name: 'Green Bay Packers', league: 'NFL', active: true},
    'clr': {id: 'clr', name: 'Colorado Rockies', league: 'MLB', active: false},
    'lad': {id: 'lad', name: 'Los Angeles Dodgers', league: 'MLB', active: false},
    'phe': {id: 'phe', name: 'Philadelphia Eagles', league: 'NFL', active: true},
    'sea': {id: 'sea', name: 'Seatle Seahawks', league: 'NFL', active: true},
    'lal': {id: 'lal', name: 'Los Angeles Lakers', league: 'NBA', active: true},
    'p76': {id: 'p76', name: 'Philadelphia 76ers', league: 'NBA', active: true},
    'mon': {id: 'mon', name: 'Montreal Canadiens', league: 'NHL', active: true}
  },
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
