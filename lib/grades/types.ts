import { Map } from 'immutable';

export interface IGrade {
    _id: string;
    created_at: Date;
    updated_at: Date;
    score: number;
    user_id: string;
    note: string;
    ref_id?: string;
    type: 'grade';
    grade_type: string;
}

export interface IState {
    grades: {
        map: Map<string, IGrade>;
    };
}
