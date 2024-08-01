import classes from "./Header.module.css"
import FoldLogo from "../../public/Logos/foldominium-logo-transparent_200x200.png"
import { Link } from "react-router-dom"
import NavBar from "./NavBar/NavBar"

export default function Header() {
  return (
      <div className={classes.header}>
        <NavBar />

        <Link className={classes.headerText} to={`/`}>
          <h1>Foldominium</h1>
          <h2>Your all-in-one origami helper!</h2>
        </Link>

        <div className={classes.imgContainer}>
          <img className={classes.responsiveImg} src={FoldLogo}/>
        </div>
      </div>
  )
}
