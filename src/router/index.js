import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Home from '../views/Home'
import Task from '../views/Task'
import QrCode from '../views/QrCode'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/qrcode" component={QrCode} />
        <Route path="/task/:id" component={Task} />
        <Route path="/task" component={Task} />
      </Switch>
    </BrowserRouter>
  )
}