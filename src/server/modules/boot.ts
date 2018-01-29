import collections from './collections/boot';
import log from './log/boot';

export default function boot() {
    collections();
    log();
}
