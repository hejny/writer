import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppModel } from './model/AppModel';
import { App } from './components/App/App';
import { observe } from 'mobx';
import { debounce } from 'lodash';
import { LOCALSTORAGE_SAVE_KEY } from './config';

const appModel = new AppModel();

ReactDOM.render(<App {...{ appModel }} />, document.getElementById(
    'root',
) as HTMLElement);

observe(appModel.messages,debounce(()=>{
  

  localStorage.setItem(LOCALSTORAGE_SAVE_KEY,JSON.stringify(appModel.serialize()));
  console.log('saved to localstorage');

},500));



appModel.newMessage();
appModel.newMessage();