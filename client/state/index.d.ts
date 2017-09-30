// import { State as UI } 			from 'lib/ui/types';
import { State as Auth } 		from './auth/types';
// import { State as Material }  	from 'lib/material/types';
// import { State as Collection }	from 'lib/collection/types';
// import { State as User } 		from 'lib/user/types';
// import { State as Settings } 	from 'lib/settings/types';
// import { State as Lesson } 		from 'lib/lesson/types';
import { State as Request } 	from './request/types';
// import { State as Group } 		from 'lib/group/types';

export interface State extends 
Auth,
Request {}