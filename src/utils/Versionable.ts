export class VersionableObject<T> {
    static from<T>(state: T): T & VersionableObject<T> {
        // FIXME: can this be without "as"
        return new VersionableObject(state) as T & VersionableObject<T>;
    }

    constructor(state: T) {
        Object.assign(this, state);
    }

    commit(state: T): this {}

    merge(versionable: VersionableObject<T>): this {}
}
