import { IAppState } from './IAppState';

export function createDefaultAppState(documentKey: string): () => IAppState {
    return () => ({
        message: `

Document ${documentKey}

---

Welcome to 🖋 Simple writer!

---

It is just a <textarea> saved to Firebase.

`.trim(),
    });
}
