import classes from "./Form.module.css"

export interface FormProps {
    label: string,
}

export function Form (label: string, placeholder?: string) {
  return (
    <form className={classes.inputWithButton}> 
        <label>{label}</label>

        <div className={classes.inlineInputButton}>
            <input type="text" name="formWithButton" placeholder={placeholder ?? ""}/>
            <input type="submit" value="SUBMIT!" />
        </div>
    </form>
  );
}