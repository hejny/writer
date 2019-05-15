import './Message.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import { IAppState } from '../../model/IAppState';
import { IObservableObject } from 'mobx';
import { copyToClipboard } from 'src/tools/copyToClipboard';

interface IMessageProps {
    appState: IAppState & IObservableObject;
}

interface IMessage {
    text: string;
    stat: {
        chars: number;
        lines: number;
        words: number;
    };
}

//todo better name the compont, because Message is only a chunk not a whole text
export const Message = observer(({ appState }: IMessageProps) => {
    //todo to some helper file,
    //todo refresh on window resize
    const charsOnRow = Math.floor(window.innerWidth / 15);

    const messages: IMessage[] = appState.message
        .split(/^(\-|\=){2,}.*$/gm)
        .filter((text) => !/^(\-|\=)/.test(text)) //todo DRY
        .map((text) => {
            return {
                text,
                stat: {
                    chars: text.trim().length,
                    lines: text.split(new RegExp(`.{0,${charsOnRow}}`, 'gm'))
                        .length,
                    words: text.trim().split(' ').length,
                },
            };
        });

    //todo better stats
    //todo stats in separate function
    return (
        <div className="Message">
            <div className="rows">
                {messages.map((message, i) => (
                    <div
                        className="row"
                        key={i}
                        style={{
                            height:
                                (message.stat.lines + (i === 0 ? 1 : 0)) * 30,
                        }}
                    >
                        <div className="infobox">
                            <div>
                                {message.stat.chars} chars {message.stat.words}{' '}
                                words
                                <button
                                    onClick={() =>
                                        copyToClipboard(message.text.trim())
                                    }
                                >
                                    📋
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <textarea
                rows={messages.reduce((agg, m) => m.stat.lines + agg, 0) + 5}
                defaultValue={appState.message}
                onChange={(event) => (appState.message = event.target.value)}
            />
        </div>
    );
});
