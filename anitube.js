const axios = require('axios');
const cheerio = require('cheerio');

const URL = 'https://anitube.in.ua';
const logo = 'https://anitube.in.ua/templates/Anitube/img/logo.png';

async function search(query) {
    const searchUrl = ${URL}/index.php?do=search&subaction=search&story=${encodeURIComponent(query)};
    const response = await axios.get(searchUrl);
    const $ = cheerio.load(response.data);

    const results = [];

    $('.th-item').each((index, element) => {
        const title = $(element).find('.th-title').text();
        const poster = $(element).find('.th-img img').attr('src');
        const href = $(element).find('.th-title a').attr('href');

        results.push({
            title,
            poster,
            href,
        });
    });

    return results;
}

async function getInfo(url) {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const title = $('h1').text();
    const description = $('.full-text').text();
    const year = $('.full-year').text();
    const rating = $('.full-rating').text();

    return {
        title,
        description,
        year,
        rating,
    };
}

async function getStream(url) {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const videoUrl = $('iframe').attr('src');

    return [videoUrl];
}

async function resolve(url) {
    return url;
}

module.exports = {
    search,
    getInfo,
    getStream,
    resolve,
    logo,
    site: URL
};
