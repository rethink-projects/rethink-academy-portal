import { ChangeEvent, useState } from "react";
import styles from "./index.module.css";
import { Images } from "../../assets";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


type TypeInput = {
    label?: string;
    type: "micro" | "default" | "small" | "large";
    onChange?: (value: string) => string;
    placeholder: string;
    caption?: string;
    hasIcon: boolean;
    disable?: boolean;
}

const InputSearch = ({ label, type, placeholder, onChange, hasIcon, caption, disable }: TypeInput) => {
    const [contentInput, setcontentInput] = useState("");

    const input_search_ = disable === true ? "input_search_disable_" : "input_search_";

    const handleClick = () => {
        setcontentInput("");
    }

    const handleChangeInput = (valueInput: string) => {
        setcontentInput(valueInput);
        onChange!(valueInput);
    }

    const sizeIcon = {
        large: {
            width: 19,
            height: 19,
        },
        default: {
            width: 16,
            height: 16,
        },
        small: {
            width: 13,
            height: 13,
        },
        micro: {
            width: 13,
            height: 13,
        }
    }


    return (
        <form className={styles["form_search_" + type]}>
            <label className={styles["label_" + type]}>
                {label}
            </label>

            <div className={styles.search_field}>
                <input style={{ backgroundImage: `url(${Images.icons.search})` }} value={contentInput} className={styles[input_search_ + type]} type="text" name="search" placeholder={placeholder} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    handleChangeInput(event.target.value);
                }} />
                <div className={styles["reset_input_" + type]}>
                    {hasIcon && contentInput.length > 0 &&
                        <>
                            <CloseOutlinedIcon style={sizeIcon[type]} className={styles["filled_input_" + type]} onClick={() => handleClick()} />

                            <div className={styles["divider_input_" + type]} />
                        </>
                    }
                </div>

            </div>
            <label className={styles.caption}>{caption}</label>


        </form>
    )
}

export default InputSearch