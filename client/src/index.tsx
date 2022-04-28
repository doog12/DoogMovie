import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import './scss/style.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Store from './store/store'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { StepsStyleConfig as Steps } from 'chakra-ui-steps'

const theme = extendTheme({
    components: {
        Steps
    }
})

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
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
        </Context.Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals()
