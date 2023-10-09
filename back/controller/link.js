const pool = require('../model/database');
const URL = require('url-parse');

const LinkModele = require("../model/linkDB");

module.exports.getShortUrl = async (req, res) => {
    const client = await pool.connect();

    const shortUrl = req.params.id;

    try {
        const link = await LinkModele.getLink(client, shortUrl);
        if (link !== undefined) {
            res.json(link);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.addLink = async (req, res) => {
    const client = await pool.connect();

    const { url } = req.body;

    try {
        if (!isURL(url)) {
            res.status(400).send("URL invalide");
        } else {
            let short = await LinkModele.getShortUrl(client, url);
            if (short !== undefined) {
                res.status(200).send(short);
            } else {
                do {
                    var shortUrl = makeID(6);
                } while (await LinkModele.linkExist(client, shortUrl));
                await LinkModele.addLink(client, url, shortUrl);
                res.status(200).send(shortUrl);
            }
        }
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.countLink = async (req, res) => {
    const client = await pool.connect();

    try {
        const count = await LinkModele.countLink(client);
        res.send(count);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

function isURL(str) {
    try {
        const parsedUrl = new URL(str);

        if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
            return true;
        }

        return false;
    } catch (error) {
        return false;
    }
}

function makeID(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}