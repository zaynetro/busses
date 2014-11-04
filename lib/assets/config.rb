# Urls
BASEURL = "http://turku.seasam.com/traveller/"
URL_PARAMS = "matkainfo?command=aikataulukot"

# Data directory relative to load tasks
DIR = Rake.application.original_dir + "/lib/assets/"

# Filenames
ROUTES_FILENAME = DIR + "bus_routes.json"
STOPS_FILENAME = DIR + "route_stops.json"
TIMETABLES_FILENAME = DIR + "timetables.json"

# Types of days
DAYS = ['workday', 'saturday', 'holiday']
