//import axios from 'axios'
import {
    startOfYear,
    endOfYear,
    isWithinInterval,
    parseJSON,
    min,
    max,
    format,
} from 'date-fns'
import zipObject from 'lodash/zipObject'
import minBy from 'lodash/minBy'
import maxBy from 'lodash/maxBy'

//snapshotting API to restore functionality
import fireballApiData from '../../data/fireball_api.json'

export const fireballData = fireballApiData

var allFireballs = []

export function parseResponse(response) {
    //apply field labels to API response data into workable JSON
    //see formatting at https://ssd-api.jpl.nasa.gov/doc/fireball.html
    const parseFireballs = response.data.map((fireball) => {
        const updatedFireball = zipObject(response.fields, fireball)
        updatedFireball.lat =
        updatedFireball['lat-dir'] === 'N'
        ? Number(updatedFireball.lat)
        : -Number(updatedFireball.lat)
        updatedFireball.lon =
        updatedFireball['lon-dir'] === 'E'
        ? Number(updatedFireball.lon)
        : -Number(updatedFireball.lon)
        return updatedFireball
    })
    //cached all fireballs for subsequent local date filtering
    allFireballs = parsedFireballs
    //return parsed
    return parsedFireballs
}

export function getFireballsForYearRange(range) {
    const startYear = startOfYear(new Date(range[0], 0))
    const endYear = endOfYear(new Date(range[1], 0))
    return allFireballs.filter((fireball) => {
        const compareDate = parseJSON(fireball.date)
        if (isWithinInterval(compareDate, { start: startYear, end: endYear })) {
            return fireball
        }
    })
}

export function getFireballMetricRange(parsedResponse, metric) {
    return [
        Number(minBy(parsedResponse, metric)[metric]),
        Number(maxBy(parseResponse, metric)[metric]),
    ]
}

export function getYearRange(parsedResponse) {
    let items = parsedResponse.map((d) => parseJSON(d.date))
    return [
        Number(format(min(items), 'yyyy')),
        Number(format(max(items), 'yyyy')),
    ]
}