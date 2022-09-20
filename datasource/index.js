import * as fs from 'fs'
import * as d3 from "d3";

const rawCSVData = fs.readFileSync('./netflix_titles.csv', { encoding: 'utf-8' });

const pre_processed = d3.csvParse(rawCSVData);

/**
 * Splits a string at the propertyName provided into an array
 * 
 * @param {Object} item represents a row in a CSV file 
 * @param {String} propertyName the name of the property that needs to be split
 * @param {String} delimiter sequence of chars that split items in the string into a list (Default: ", ")
 * @returns Array of items broken up by delimiter
 */
function splitCellItem(item, propertyName, delimiter = ", ") {
    return item[propertyName].split(delimiter).filter(item => item);
}

const processed = pre_processed.map(item => {
    return {
        ...item,
        director: splitCellItem(item, 'director'),
        cast: splitCellItem(item, 'cast'),
        country: splitCellItem(item, 'country'),
        listed_in: splitCellItem(item, 'listed_in'),
    };
})

const contents = JSON.stringify(processed, null, 2);

fs.writeFileSync('./netflix_titles.json', contents, { encoding: 'utf-8' });