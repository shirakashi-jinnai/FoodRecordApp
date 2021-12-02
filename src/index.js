import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals'
import teststore from './store/store'
import * as History from 'history'
import { theme } from './asetts/theme'
import { ThemeProvider } from '@material-ui/styles'
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

// ReactDOM.render(
//   // <Provider store={store}>
//   //   <ConnectedRouter history={history}>
//   //     <MuiThemeProvider theme={theme}>
//   //       <App />
//   //     </MuiThemeProvider>
//   //   </ConnectedRouter>
//   // </Provider>
//   <>
//     <App />
//   </>,
//   document.getElementById('root'),
// )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
