import classes from "./App.module.css"
import { Form } from "./Form/Form"
import Header from "./Header/Header"

function App() {
  return (
    <div className={classes.appView}>
      <Header />
      <div className={classes.body}>
        {Form("Input an object, mesh, or shape to generate its origami crease pattern:",
              "(e.g. A dog with wings, a piano, or a small piece text!)"
        )}
      </div>
    </div>
  )
}

export default App
