import classes from "./Header.module.css"
import FoldLogo from "../../public/Logos/foldominium-logo-transparent_200x200.png"

export default function Header() {
  return (
      <div className={classes.header}>
        <a className={classes.headerText} href={`/`}>
          <h1>Foldominium</h1>
          <h2>Your all-in-one origami helper!</h2>
        </a>

        <div className={classes.imgContainer}>
          <img className={classes.responsiveImg} src={FoldLogo}/>
        </div>
      </div>
  )
}
