import './Message.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import {
    IMessage,
    createDefaultMessageText,
    MessageTextLanguageDictionary,
    MessageTextLanguage,
    MessageTextFormat,
    MessageTextFormatDictionary,
    createDefaultToItem,
    MessageStatusDictionary,
    MessageStatus,
} from '../../model/IMessage';

interface IMessageProps {
    message: IMessage;
    remove: () => void;
}

export const Message = observer(({ message, remove }: IMessageProps) => {
    return (
        <div className={`Message ${message.status}`}>
            <div className="status">
                <select
                    value={message.status}
                    onChange={(event) =>
                        (message.status = event.target.value as MessageStatus)
                    }
                >
                    {MessageStatusDictionary.map(({ value, name }) => (
                        <option key={value} value={value}>
                            {name}
                        </option>
                    ))}
                </select>
                {message.status !== 'FINISHED' && (
                    <button onClick={() => (message.status = 'FINISHED')}>
                        Finish
                    </button>
                )}
            </div>

            <div className="to">
                To:
                <ul>
                    {message.to.map((toItem) => (
                        <li key={toItem.uuid}>
                            <input
                                spellCheck={false}
                                defaultValue={toItem.name}
                                onChange={(event) =>
                                    (toItem.name = event.target.value)
                                }
                            />
                            <button
                                onClick={() =>{
                                    if(confirm(`Do you really want to remove ${toItem.name}?`))
                                    (message.to = message.to.filter(
                                        (toItem2) => toItem2 !== toItem,
                                    ))
                                }}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
                <button onClick={() => message.to.push(createDefaultToItem())}>
                    Add
                </button>
            </div>

            <div className="texts">
                {message.texts.map((text) => (
                    <div className="text" key={text.uuid}>
                        <div className="text-tools">
                            <input
                                defaultValue={text.name}
                                onChange={(event) =>
                                    (text.name = event.target.value)
                                }
                            />

                            <select
                                value={text.language}
                                onChange={(event) =>
                                    (text.language = event.target
                                        .value as MessageTextLanguage)
                                }
                            >
                                {MessageTextLanguageDictionary.map(
                                    ({ value, name }) => (
                                        <option key={value} value={value}>
                                            {name}
                                        </option>
                                    ),
                                )}
                            </select>

                            <select
                                value={text.format}
                                onChange={(event) =>
                                    (text.format = event.target
                                        .value as MessageTextFormat)
                                }
                            >
                                {MessageTextFormatDictionary.map(
                                    ({ value, name }) => (
                                        <option key={value} value={value}>
                                            {name}
                                        </option>
                                    ),
                                )}
                            </select>

                            <button
                                onClick={() =>{
                                    if(confirm(`Do you really want to remove text ${text.name}?`)){
                                    (message.texts = message.texts.filter(
                                        (text2) => text2 !== text,
                                    ))
                                }}}
                            >
                                Remove
                            </button>
                        </div>

                        <textarea
                            defaultValue={text.content}
                            spellCheck={true}
                            lang={text.language}
                            onChange={(event) =>
                                (text.content = event.target.value)
                            }
                        />
                    </div>
                ))}

                <button
                    onClick={() =>
                        message.texts.push(createDefaultMessageText())
                    }
                >
                    Add text
                </button>
            </div>

            <button onClick={remove}>Remove</button>

            {/*todo <ul className="statistics">
                <li>{message.text.length} chars</li>
                <li>{message.text.length} words</li>
                <li>{message.text.length} sentences</li>
            </ul>*/}
        </div>
    );
});
