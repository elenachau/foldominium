import Header from "../Header/Header";
import classes from "../App.module.css"

export default function AboutUs() {
  return (
    <div className={classes.appView}>
        <Header/>
        <div className={classes.body}>
          <p>Hello!</p>
        </div>
    </div>
  )
}