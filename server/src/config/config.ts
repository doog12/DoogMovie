interface Config {
    site_name: string
    site_description: string
    site_url: string
}

const config: Config = {
    site_name: "Doog Movie",
    site_description: "Фильмы, сериалы и аниме в одном месте",
    site_url: "http://localhost:3000"
}

module.exports = config