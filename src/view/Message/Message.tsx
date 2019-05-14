import './Message.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import { IAppState } from '../../model/IAppState';
import { IObservableObject } from 'mobx';
import { copyToClipboard } from 'src/tools/copyToClipboard';

interface IMessageProps {
    appState: IAppState & IObservableObject;
}

export const Message = observer(({ appState }: IMessageProps) => {
    //todo better naming message vs. text vs. row
    const textLines = appState.message.split('\n').reduce(
        (rows, row) => {
            const charsOnRow = Math.floor(window.innerWidth / 15);

            const row_lines = row.match(
                new RegExp(`.{1,${charsOnRow}}`, 'g'),
            ) || [''];
            //console.log(row,row_lines);
            for (const row of row_lines) {
                rows.push(row);
            }
            return rows;
        },
        [] as string[],
    );

    let messagesLinesCurrentRef: string[] = [];
    const messagesLines: string[][] = [messagesLinesCurrentRef];

    for (const line of textLines) {
        if (/^(\-|\=){2,}/g.test(line)) {
            messagesLinesCurrentRef = [];
            messagesLines.push(messagesLinesCurrentRef);
        } else {
            messagesLinesCurrentRef.push(line);
        }
    }

    //todo better stats
    //todo stats in separate function
    return (
        <div className="Message">
            <div className="rows">
                {messagesLines
                    .map((lines) => lines.map((line) => line || ' ').join('\n'))
                    .map((text, i) => (
                        <div
                            className="row"
                            key={i}
                            style={{
                                height:
                                    (!text ? 1 : text.split('\n').length + 1) *
                                    30,
                            }}
                        >
                            <div className="infobox">
                                <div>
                                    {text.trim().length} chars{' '}
                                    {text.trim().split(' ').length} words
                                    <button
                                        onClick={() =>
                                            copyToClipboard(text.trim())
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
                rows={textLines.length + 5}
                defaultValue={appState.message}
                onChange={(event) => (appState.message = event.target.value)}
            />
        </div>
    );
});
