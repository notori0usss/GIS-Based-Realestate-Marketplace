import { useEffect } from "react"
import L from "leaflet"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import "leaflet-routing-machine"
import { useMap } from "react-leaflet"
import saleIconPng from "../assets/map-icons/sale.png"

L.Marker.prototype.options.icon = L.icon({
  iconUrl: saleIconPng,
  iconSize: [40, 40],
})

export default function LeafletRoutingMachine({
  propertyLocation,
  poiLocation,
}) {
  const map = useMap()

  useEffect(() => {
    if (!map) return

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(propertyLocation[0], propertyLocation[1]),
        L.latLng(poiLocation[0], poiLocation[1]),
      ],
      routeWhileDragging: false,
    }).addTo(map)

    return () => map.removeControl(routingControl)
  }, [map, propertyLocation, poiLocation])

  return null
}
