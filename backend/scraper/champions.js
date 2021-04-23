const cheerio = require("cheerio");
const axios = require("axios").default;


const getHtmlPage = async (url) => {
    try {
        const { data } = await axios.get(url);
        return data;
      } catch {
        console.error(
          `ERROR: An error occurred while trying to fetch the URL: ${url}`
        );
      }
}

const scrapChampionData = async (url) => {
    try{
        let champ_data = {
            name: '',
            picture: "",
            data: {
              release_date: "",
              class: [],
              position: [],
              Ressource: "",
              range_type: "",
              adaptive_type: ""
            }
        };

        // downloading html page + loading it 
        const html_page = await getHtmlPage(url);
        const $ = cheerio.load(html_page);

        // scraping process
        champ_data.name = $("#infobox-champion-container > aside > div:nth-child(2)").text().trim(); // champion name
        champ_data.data.release_date = $("#infobox-champion-container > aside > div:nth-child(4) > div > a").text().trim(); // champion release date
        $("#infobox-champion-container > aside > div:nth-child(6) > div > span > a.mw-redirect").each((i, element) => {
            champ_data.data.class.push(element.children[0].data.trim());
        }); // champions classes
        $("#infobox-champion-container > aside > div:nth-child(8) > div > span > a:nth-child(2)").each((i, element) => {
            champ_data.data.position.push(element.childNodes[0].data.trim());
        }); // champions positions
        champ_data.data.Ressource = $("#infobox-champion-container > aside > div:nth-child(9) > div > span > a:nth-child(2)").text().trim(); // champion ressource
        champ_data.data.range_type = $("#infobox-champion-container > aside > div:nth-child(10) > div > span > a.mw-redirect").text().trim(); // champion range type
        champ_data.data.adaptive_type = $("#infobox-champion-container > aside > div:nth-child(11) > div > span > a").text().trim(); // champion adaptive type

        return champ_data;
    }catch(e) {
        throw e;
    }
}

module.exports = scrapChampionData;