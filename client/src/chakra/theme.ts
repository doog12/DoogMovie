import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { StepsStyleConfig as Steps } from 'chakra-ui-steps'

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}
const styles = {
    global: () => ({
        body: {
            bg: '#0f1015',
            fontFamily: '',
            color: '#fff'
        }
    })
}
const theme = extendTheme({
    config,
    styles,
    components: {
        Steps
    }
})

export default theme