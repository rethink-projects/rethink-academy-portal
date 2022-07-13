import { ChangeEvent, useState } from "react";
import styles from "./index.module.css";
import { Images } from "../../assets";


type TypeInput = {
    label: string;
    type: "micro" | "default" | "small" | "large";
    onChange?: (value: string) => string;
    placeholder: string;
    caption?: string;
    hasIcon: boolean;
}

const InputSearch = ({ label, type, placeholder, onChange, hasIcon, caption }: TypeInput) => {
    const [contentInput, setcontentInput] = useState("");

    const handleClick = () => {
        setcontentInput("");
    }

    const handleChangeInput = (valueInput: string) => {
        setcontentInput(valueInput);
        onChange!(valueInput);
    }


    return (
        <form className={styles["form_search_" + type]}>
            <label className={styles["label_" + type]}>
                {label}
            </label>

            <div className={styles.search_field}>
                <input style={{ backgroundImage: `url(${Images.search})` }} value={contentInput} className={styles["input_search_" + type]} type="text" name="search" placeholder={placeholder} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    handleChangeInput(event.target.value);
                }} />
                <div className={styles["reset_input_" + type]}>
                    {hasIcon && contentInput.length > 0 &&
                        <>
                            <img className={styles["filled_input_" + type]} onClick={() => handleClick()} src={Images.filledInput} />
                            <img className={styles["divider_input_" + type]} src={Images.dividerInput} />
                        </>
                    }
                </div>

            </div>
            <label className={styles.caption}>{caption}</label>


        </form>
    )
}

export default InputSearch