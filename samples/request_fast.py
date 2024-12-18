import requests

r=requests.get("http://92.205.191.109:8000/foodhub-data-r-and-d/?fields=Name&fields=Longitude&fields=Latitude", headers={"X-API-KEY":"a8105743-dee6-4149-9f67-190c11e32246"})
#r=requests.get("http://92.205.191.109:8000/foodhub-data-r-and-d/?fields=Name&fields=Longitude&fields=Latitude&X-API-KEY=a8105743-dee6-4149-9f67-190c11e32246")
print(r.text)