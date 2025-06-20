import config from '../config/config';
import { XMLParser } from 'fast-xml-parser';

export class Utils {
  public async getJobPostingFromExternalSource() {
    try {
      const url = 'https://mrge-group-gmbh.jobs.personio.de/xml';
      console.log('You are now about to fetch external data source');
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `There was an error getting response from the remote URL: ${response.status}`,
        );
      }
      const dataResponse = await response.text();
      // console.log(dataResponse);
      const parser = new XMLParser();
      let jsonData = parser.parse(dataResponse);
      return jsonData['workzag-jobs']['position'];
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Error fetching data');
    }
  }
}
