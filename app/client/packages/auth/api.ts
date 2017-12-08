import * as request from 'superagent';

declare var window;

export function login(username: string, password: string) {
    return request
        .post('/api/' + window.location.pathname.split('/')[1] + '/auth/login')
        .send({ username, password })
        .set('x-auth', window.localStorage.jwt_token || window.jwt_token || '');
}

export function logout() {
    return request
        .post('/api/' + window.location.pathname.split('/')[1] + '/auth/logout')
        .set('x-auth', window.localStorage.jwt_token || window.jwt_token || '');
}

export function register(username: string, password: string) {
    return request
        .post(
            '/api/' + window.location.pathname.split('/')[1] + 'auth/register'
        )
        .send({ username, password });
}

export function get_session() {
    return request
        .get(
            '/api/' +
                window.location.pathname.split('/')[1] +
                '/user/auth/session'
        )
        .set('x-auth', window.localStorage.jwt_token || window.jwt_token || '');
}
