import './Toolbar.css';
import * as React from 'react';
import { observer } from 'mobx-react';
import { AppModel } from '../../model/AppModel';

interface IToolbarProps {
    appModel: AppModel;
    save: ()=>void;
    download: ()=>void;
}

export const Toolbar = observer(({ appModel, save, download }: IToolbarProps) => {
    return (
        <div className="Toolbar">
            <button onClick={()=>appModel.newMessage()}>Add message</button>
            <button onClick={()=>save()}>{appModel.saved?`Saved at ${appModel.saved/*todo use here momentjs*/}`:'Save'}</button>
            <button onClick={()=>download()}>Download</button>
        </div>
    );
});
