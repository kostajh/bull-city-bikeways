#
# Import route data from Google Docs and save as GeoJSON.

import gspread
from geojson import LineString, Feature, Point, FeatureCollection
import os
import configparser

def setUp():
    creds_filename = "config"
    try:
        config_filename = os.path.join(
            os.path.dirname(__file__), creds_filename)
        config = configparser.ConfigParser()
        config.readfp(open(config_filename))
        email = config.get('Google Account', 'email')
        password = config.get('Google Account', 'password')
        return email, password

    except IOError:
        msg = "Can't find %s for reading google account credentials. " \
              "You can create it from %s.example in tests/ directory."
        raise Exception(msg % (creds_filename, creds_filename))

# Get username/password from `config`
email, password = setUp()
# Login with your Google account
gc = gspread.login(email, password)

# Get submissions from Google Spreadsheets
wks = gc.open_by_key("0AlZGBQh5vhE1dGFObVAtT0VKRjUxSUJjNnRaQlFIemc").sheet1
