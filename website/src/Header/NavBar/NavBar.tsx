import { Link } from "react-router-dom"
import classes from "./NavBar.module.css"

export default function NavBar() {
  return (
      <div className={classes.navBar}>
         <input className={classes.checkbox} type="checkbox" id="checkbox"/>
         <label htmlFor="checkbox" className={classes.toggle}>
            <div className={`${classes.bars} ${classes.bar1}`} />
            <div className={`${classes.bars} ${classes.bar2}`} />
            <div className={`${classes.bars} ${classes.bar3}`} />
        </label>

        <div className={classes.sublinks}>
          <ul>
            <li><Link to={`/`}><p>Home</p></Link></li>
            <li><Link to={`/aboutus`}><p>About Us</p></Link></li>
            <li><a href={`../../../simulator/cp-editor/cpedit.html`}><p>Creator</p></a></li>
            <li><a href="https://origamisimulator.org"><p>Simulator</p></a></li>
          </ul>
        </div>
      </div>
  )
}
