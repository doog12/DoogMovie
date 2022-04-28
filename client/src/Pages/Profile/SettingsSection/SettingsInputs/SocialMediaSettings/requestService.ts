import { DataType } from './SocialMediaSettings'

export const requestService = (data: DataType): DataType => {
    const entriesData = Object.entries<string>(data)
    // Filtering Data
    const filteredData = entriesData.filter(([key, value]) => {
        const trimmedValue = value.trim()
        return trimmedValue !== null && trimmedValue !== ''
    })
        .map(([key, value]) => {
            if (key === 'whatsApp') {
                const replacedValue: string = value.replace('+', '')
                return [key, replacedValue]
            }
            if (key === 'telegram') {
                const replacedValue: string = value.replace('@', '')
                return [key, replacedValue]
            }
            return [key, value]
        })

    // Filtered Entries => Object
    return Object.fromEntries(filteredData)
}