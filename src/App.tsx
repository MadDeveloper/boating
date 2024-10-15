import { useState } from "react"
import config from "./config"
import {
  calculateCapeCompass,
  calculateRouteCompassVariation,
  calculateSurfaceRoute,
  calculateTrueCape,
} from "./lib/navigation/route"
import { calculateWindDrift } from "./lib/navigation/wind"

export default function App() {
  const [windSpeed, setWindSpeed] = useState(0)
  const [boatSpeed, setBoatSpeed] = useState(0)
  const [driftCoefficient, setDriftCoefficient] = useState(
    config.boat.driftCoefficient
  )
  const [drift, setDrift] = useState<number | null>(null)
  const backgroundRoute = 150
  const currentDirection = 155
  const currentStrength = 1.5
  const surfaceSpeed = 2.5
  const windDrift = 5
  const windDirection = 0
  const declinaison = 4
  const deviation = 8
  const variation = calculateRouteCompassVariation(declinaison, deviation)
  const surfaceRoute = calculateSurfaceRoute(
    backgroundRoute,
    currentDirection,
    currentStrength,
    surfaceSpeed
  )
  const trueCape = calculateTrueCape(surfaceRoute, windDrift, windDirection)
  const capeCompass = calculateCapeCompass(trueCape, variation)

  function onClickCalculateWindDrift() {
    setDrift(calculateWindDrift(windSpeed, boatSpeed, driftCoefficient))
  }

  return (
    <main>
      <h1>Boat Navigation</h1>
      <p>Use the calculator to determine the wind drift of a boat.</p>
      <div>
        <label htmlFor="wind-speed">Vitesse du vent (kts)</label>
        <input
          id="wind-speed"
          type="number"
          value={windSpeed}
          onChange={(event) => setWindSpeed(parseFloat(event.target.value))}
        />
      </div>
      <div>
        <label htmlFor="boat-speed">Vitesse du bateau (kts)</label>
        <input
          id="boat-speed"
          type="number"
          value={boatSpeed}
          onChange={(event) => setBoatSpeed(parseFloat(event.target.value))}
        />
      </div>
      <div>
        <label htmlFor="drift-coefficient">Coefficient de dérive</label>
        <input
          id="drift-coefficient"
          type="number"
          value={driftCoefficient}
          onChange={(event) =>
            setDriftCoefficient(parseFloat(event.target.value))
          }
        />
      </div>
      <div>
        <button onClick={onClickCalculateWindDrift}>Calculate</button>
      </div>
      {typeof drift === "number" && (
        <div>
          <span>Le coefficient de dérive est : {drift}&deg;</span>
        </div>
      )}
      <div>
        <span>Route Fond : {backgroundRoute}&deg;</span>
      </div>
      <div>
        <span>Route Surface : {surfaceRoute}&deg;</span>
      </div>
      <div>
        <span>Cap Vrai : {trueCape}&deg;</span>
      </div>
      <div>
        <span>Cap Compas : {capeCompass}&deg;</span>
      </div>
    </main>
  )
}
