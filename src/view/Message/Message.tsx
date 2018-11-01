import './Message.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import { IAppState } from '../../model/IAppState';
import { IObservableObject } from 'mobx';

interface IMessageProps {
    appState: IAppState & IObservableObject;
}



export const Message = observer(({ appState }: IMessageProps) => {

    const messageLines = appState.message.split('\n').reduce((rows,row)=>{

        const charsOnRow = Math.floor(window.innerWidth/15);

        const row_lines = row.match(new RegExp(`.{1,${charsOnRow}}`,'g'))||[''];
        //console.log(row,row_lines);
        for(const row of row_lines){
            rows.push(row);
        }
        return rows;


    },[] as string[]);


    let aggregatedText = '';
    return (
        <div className="Message">

            <div className="rows">
                {messageLines.map(((row,i)=>{

      
                    if(/^(\-|\=){2,}/g.test(row)){
              
                        const text = aggregatedText;
                        aggregatedText = '';

                        return(
                            <div key={i} className="row separator">
                                &nbsp;
                                <div>
                                    {text.length} chars {text.split(' ').length} words
                                </div>
                               
                            </div>
                        );
                    }else{
                        aggregatedText+=row;
                        return(
                            <div  key={i} className="row">
                                &nbsp;
                            </div>
                        );
                    }



                }))}
            </div>

            <textarea
                rows={messageLines.length}
                defaultValue={appState.message}
                onChange={(event) => (appState.message = event.target.value)}
            />

            


        </div>
    );
});
