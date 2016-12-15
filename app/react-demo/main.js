import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter.js';
import HelloMessage from './Greeter.js';

import './main.css';

render(<Greeter />, document.getElementById('root'));
render(<HelloMessage name='Tim' />, document.getElementById('HelloMessage'));