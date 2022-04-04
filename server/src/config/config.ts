interface Config {
    site_name: string
    site_description: string
    site_url: string,
    paths: {
        static: string
    },
    user: {
        defaultAvatarName: string
    }
}

const config: Config = {
    site_name: "Doog Movie",
    site_description: "Фильмы, сериалы и аниме в одном месте",
    site_url: "http://localhost:3000",
    paths: {
        static: "E:\\Рабочий стол\\Files\\Developing\\Web\\2021\\Projects\\DoogMovie\\server\\src\\static"
    },
    user: {
        defaultAvatarName: 'default-user.png'
    }
}

module.exports = config
