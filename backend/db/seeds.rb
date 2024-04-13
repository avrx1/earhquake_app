# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Feature.destroy_all

require "json"
require 'open-uri'


t = Time.now
end_date = t.strftime("%Y-%m-%d")
start_date = (t - 1.month + 1.day).strftime("%Y-%m-%d")
f = URI.open("https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=#{start_date}%2000:00:00&endtime=#{end_date}%2023:59:59&minmagnitude=-1&maxmagnitude=10&orderby=time")
myData = JSON.parse(f.read)["features"]

myData.each{|myData|

    longitude = myData["geometry"]["coordinates"][0]
    latitude = myData["geometry"]["coordinates"][1]


    data = {
        "type1": myData["type"],
        "external_id": myData["id"],
        "magnitude": myData["properties"]["mag"],
        "place": myData["properties"]["place"],
        "time": myData["properties"]["time"],
        "tsunami": myData["properties"]["tsunami"],
        "mag_type": myData["properties"]["magType"],
        "title": myData["properties"]["title"],
        "longitude": longitude,
        "latitude": latitude,
        "external_url": myData["properties"]["url"]
    }

    if latitude.between?(-90, 90) && longitude.between?(-180, 180)
        Feature.create!(data)
    end
}
