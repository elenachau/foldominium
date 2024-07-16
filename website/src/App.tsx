import classes from "./App.module.css"
import FoldLogo from "../public/Logos/foldominium-logo-transparent_200x200.png"

function App() {
  return (
    <div className={classes.appView}>
      <div className={classes.header}>
        <img src={FoldLogo}/>
        <div className={classes.headerText}>
          <h1>Foldomonium</h1>
          <h2>Your all-in-one origami helper!</h2>
        </div>
      </div>
    </div>
  )
}

export default App
