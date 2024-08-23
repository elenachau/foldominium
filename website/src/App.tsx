import classes from "./App.module.css"
import Header from "./Header/Header"
import CreatorScreen from "../public/CreatorScreen.png"
import OrigamiSimulatorScreen from "../public/OrigamiSimulatorScreen.png"

function App() {
  return (
    <div className={classes.appView}>
      <Header />
      <div className={classes.body}>
        <div className={classes.innerBody}>
          <div className={classes.buttonWithImg}>
            <a href="/simulator/cp-editor/cpedit.html">
              <button type="button">Create a Fold!</button>
            </a>
            <p>How it works: Create, experiment, and simulate origami folds from scratch using our intuitive FOLD editor.</p>
            <img className={classes.homeImg} src={CreatorScreen}></img>
          </div>

          <div className={classes.divider}></div>

          <div className={classes.buttonWithImg}>
            <a href="https://origamisimulator.org" target="_blank">
              <button type="button">Simulate a Fold!</button>
            </a>
            <p>How it works: Bring your folds to life 3D viewport instantly utilizing OrigamiSimulator.</p>
            <img className={classes.homeImg} src={OrigamiSimulatorScreen}></img>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App
