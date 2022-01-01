import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import teststore from './reducks/store/store'
import { theme } from './asetts/theme'
import { MuiThemeProvider } from '@material-ui/core'
import App from './App'

const history = createBrowserHistory()
export const store = teststore(history)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)
