import axios from "axios";

/*
    Crawl a site and return the content in an AI-friendly format (for the chatbots)
*/
export default async function crawlSite(url: string) {
    const payload = {
        'api_key': process.env.NEXT_PUBLIC_SCRAPER_API_KEY,
        'url': url,
        'country': 'us',
        'output_format': 'text'
    }

    try {
        const response = await axios.post('https://api.scraperapi.com/v1', payload);

        console.log("Response after crawling: ", response.data);

        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}