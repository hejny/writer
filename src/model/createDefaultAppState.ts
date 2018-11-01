import { IAppState } from './IAppState';

export function createDefaultAppState(): IAppState {
    return {
        message: `

Welcome to 🖋 Simple writer!

---

It is just <textarea> saved to LocalStorage.

`,
    };
}
