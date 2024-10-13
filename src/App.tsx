import { useState } from "react"
import config from "./config"
import { calculateWindDrift } from "./lib/navigation/wind"

export default function App() {
  const [windSpeed, setWindSpeed] = useState(0)
  const [boatSpeed, setBoatSpeed] = useState(0)
  const [driftCoefficient, setDriftCoefficient] = useState(
    config.boat.driftCoefficient
  )
  const [drift, setDrift] = useState<number | null>(null)

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
    </main>
  )
}
