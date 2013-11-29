#
# Import route data from Google Docs and save as GeoJSON.

import gspread
import json
import os
import configparser


def setUp():
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

# Get username/password from `config`
email, password = setUp()
# Login with your Google account
gc = gspread.login(email, password)

# Get submissions from Google Spreadsheets
wks = gc.open_by_key("0AlZGBQh5vhE1dGFObVAtT0VKRjUxSUJjNnRaQlFIemc").sheet1
