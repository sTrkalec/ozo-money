import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { TransactionsProvider } from './contexts/TransactionsContext'
import { Transactions } from './pages/Transactions'
import { Router } from './router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <GlobalStyle />
        <TransactionsProvider>
          <Router/>
        </TransactionsProvider>
      </BrowserRouter>

    </ThemeProvider>
  )
}
