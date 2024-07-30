import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Header from "../Header/Header";
import classes from "../App.module.css"

function GetError()
{
    const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div id="error-page">
        <h1>Oops! {error.status}</h1>
        <p>{error.statusText}</p>
        {error.data?.message && (
          <p>
            <i>{error.data.message}</i>
          </p>
        )}
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div id="error-page">
        <h1>Oops! Unexpected Error</h1>
        <p>Something went wrong:</p>
        <p>
          <i>{error.message}</i>
        </p>
      </div>
    );
  } else {
    return <></>;
  }
}

export default function ErrorPage() {
  return (
    <div className={classes.appView}>
        <Header/>
        <div className={classes.body}>
            {GetError()}
        </div>
    </div>
  )
}