module.exports.addLink = async (client, url, shortUrl) => {
    return await client.query(`
        INSERT INTO link(url, short) VALUES
        ($1, $2)`, [url, shortUrl]
    );
};

module.exports.getShortUrl = async (client, url) => {
    let linkResult = await client.query(`
        SELECT * FROM link WHERE url = $1`, [url]
    );

    if (linkResult.rows.length === 0) {
        return undefined;
    }
    
    return linkResult.rows[0].short;
};

module.exports.getLink = async (client, shortUrl) => {
    let linkResult = await client.query(`
        SELECT * FROM link WHERE short = $1`, [shortUrl]
    );
    
    if (linkResult.rows.length === 0) {
        return undefined;
    }

    return linkResult.rows[0].url;
}

module.exports.linkExist = async (client, shortUrl) => {
    let linkResult = await client.query(`
        SELECT COUNT(*) FROM link WHERE short = $1`, [shortUrl]
    );

    return linkResult.rows[0].count > 0;
};

module.exports.countLink = async (client) => {
    let linkResult = await client.query(`
        SELECT COUNT(*) FROM link`
    );

    return linkResult.rows[0].count;
};