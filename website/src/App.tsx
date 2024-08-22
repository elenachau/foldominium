import classes from "./App.module.css"
import { Form } from "./Form/Form"
import Header from "./Header/Header"
import Creator from "./Creator/Creator"

function App() {
  return (
    <div className={classes.appView}>
      <Header />
      <div className={classes.body}>
        {Form("Input an object, mesh, or shape to generate its origami crease pattern:",
              "(e.g. A dog with wings, a piano, or a small piece text!)"
        )}
        <Creator/>
        <a href="cp-editor/cpedit.html">Crease Pattern Editor</a>
        <a href="tw-capstone/simulate.html">Crease Pattern Editor</a>
      </div>
    </div>
  )
}

export default App
