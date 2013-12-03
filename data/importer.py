#
# Import route data from Google Docs and save as GeoJSON.
#
import gspread
import json
import os
import configparser
import hashlib


def setUp():
    """ Load the config """
    try:
        config_filename = os.path.join(
            os.path.dirname(__file__), "config")
        config = configparser.ConfigParser()
        config.readfp(open(config_filename))
        return config.get('Google Account', 'email'), config.get(
            'Google Account', 'password')

    except IOError:
        msg = "Can't find 'config' for reading google account credentials. " \
              "You can create it from config.example in data/ directory."
        raise Exception(msg)


def loadData():
    """ Load data from the Google Spreadsheet, return a list of lists. """
    # Get username/password from `config`
    email, password = setUp()
    # Login with your Google account
    gc = gspread.login(email, password)

    # Get submissions from Google Spreadsheets
    wks = gc.open_by_key("0AlZGBQh5vhE1dGFObVAtT0VKRjUxSUJjNnRaQlFIemc").sheet1
    return wks.get_all_values()[1:]


def updateGeoJson(geojson, row):
    """ Update the properties of the GeoJSON with Gdata values.
        row[0] = date
        row[1] = full name
        row[2] = email
        row[3] = privacy setting for name display
        row[4] = unknown
        row[5] = purpose of trip
        row[6] = unknown
        row[7] = starting time
        row[8] = GeoJSON
        row[9] = unknown
        row[10] = notes
        row[11] = duration
    """
    properties = dict()
    properties['title'] = row[1]
    properties['description'] = row[9]
    # TODO: Update properties
    geojson['features'][0]['properties'] = properties
    return json.dumps(geojson)


def writeData(entries):
    """ Write geojson into `data` dir and update dictionary.json """
    for entry in entries:
        if entry[0] is '':
            continue
        else:
            date = entry[0].split(' ', 1)[0].replace("/", "-")
            firstname = entry[1].split(' ', 1)[0].lower()
            jsonhash = hashlib.sha256(entry[8].encode(
                'utf-8')).hexdigest()[:16]
            filename = "%s-%s-%s.geojson" % (date, firstname, jsonhash)
            f = open(filename, 'w')
            geojson = updateGeoJson(json.loads(entry[8]), entry)
            f.write(geojson)
            f.close()
            # Update dictionary
            f = open('dictionary.json', 'r')
            data = json.loads(f.read())
            f.close()
            f = open('dictionary.json', 'w')
            if filename not in data:
                data.append(filename)
                print('Writing file: %s' % filename)
            f.write(json.dumps(data))
            f.close()
    return

# Load data.
entries = loadData()
# Write data.
writeData(entries)
