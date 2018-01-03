import { Map } from 'immutable';

import { ICard, IData, ICollectionData } from 'client/packages/cards/types';

import { IState as ITags } from 'client/packages/tags';
import { IState as IInstall } from 'client/packages/install';
import { IState as IAuth } from 'client/packages/auth';
import { IUI } from 'client/packages/ui/reducer';
import { IState as IUsers } from 'client/packages/users';
import { IState as IGroups } from 'client/packages/groups';
import { IState as ICollection } from 'client/packages/collections';

export interface IState
    extends ITags,
        IInstall,
        IAuth,
        IUsers,
        IGroups,
        ICollection {
    cards: {
        map: Map<string, ICard>;
    };
    data: {
        map: Map<string, IData>;
    };
    ui: IUI;
}
