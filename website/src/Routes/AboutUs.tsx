import Header from "../Header/Header";
import classes from "./AboutUs.module.css"
import appClasses from "../App.module.css"
import Crane from "../../public/ProfilePictures/paper-crane.png"
import Plane from "../../public/ProfilePictures/paper-plane.svg"
import FortuneTeller from "../../public/ProfilePictures/paper-fortune-teller.png"

export default function AboutUs() {
  return (
    <div className={appClasses.appView}>
        <Header/>

        <div className={appClasses.body}>
          <h1>Developers:</h1>

          <div className={classes.profiles}>

            <div className={classes.aboutMeProfile}>
              <img src={Plane}/>
              <h1>Elena Chau</h1>
              <h3><a href="https://www.linkedin.com/in/elena-x-chau" target="_blank">(Linkedin)</a></h3>
              <p>Machine Learning</p>
            </div>

            <div className={classes.aboutMeProfile}>
              <img src={Crane}/>
              <h1>Josue Ochoa</h1>
              <h3><a href="https://www.linkedin.com/in/josuejochoa" target="_blank">(Linkedin)</a></h3>
              <p>Machine Learning</p>
            </div>

            <div className={classes.aboutMeProfile}>
              <img src={FortuneTeller}/>
              <h1>Marlo Ongkingco</h1>
              <h3><a href="https://www.linkedin.com/in/marloongkingco/" target="_blank">(Linkedin)</a></h3>
              <p>Front-End & DevOps</p>
            </div>
        </div>
      </div>
    </div>
  )
}