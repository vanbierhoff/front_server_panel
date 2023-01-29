const PROXY_CONFIG = [
    {
        context: [
            "/api",
            "/admin"
        ],

        target: "http://localhost:3000/",
        secure: false,
        headers: {
            Host: 'localhost',
            'Upgrade-Insecure-Requests': 1
        }

    }
]

module.exports = PROXY_CONFIG;
