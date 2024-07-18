import classes from "./App.module.css"
import FoldLogo from "../public/Logos/foldominium-logo-transparent_200x200.png"
import { Form } from "./Form/Form"

function Test() {
  console.log("Clicked!");
}

function App() {
  return (
    <div className={classes.appView}>
      <div className={classes.header}>

        <div className={classes.imgContainer}>
          <img src={FoldLogo}/>
        </div>

        <div className={classes.headerText}>
          <h1>Foldominium</h1>
          <h2>Your all-in-one origami helper!</h2>
        </div>

      </div>

      <div className={classes.body}>
        {Form("Input an object, mesh, or shape to generate its origami crease pattern:",
              "(e.g. A dog with wings, a piano, or a small piece text!)"
        )}
      </div>
    </div>
  )
}

export default App
