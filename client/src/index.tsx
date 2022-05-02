import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import './scss/style.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Store from './store/store'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './chakra/theme'

interface State {
    store: Store
}

const store = new Store()

export const Context = createContext<State>({
    store
})

ReactDOM.render(
    <React.StrictMode>
        <Context.Provider value={{ store }}>
            <ChakraProvider theme={theme} resetCSS={false}>
                <App />
            </ChakraProvider>
        </Context.Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals()
