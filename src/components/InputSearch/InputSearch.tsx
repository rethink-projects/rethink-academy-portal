import { ChangeEvent, useState } from "react";
import styles from "./InputSearch.module.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

type TypeInput = {
  label?: string;
  type?: "micro" | "default" | "small" | "large";
  onChange?: (value: string) => void;
  changeData?: () => void;
  placeholder?: string;
  caption?: string;
  hasIcon: boolean;
  disable?: boolean;
};

const InputSearch = ({
  label,
  type = "default",
  placeholder = "Search",
  onChange,
  changeData,
  hasIcon,
  caption,
  disable,
}: TypeInput) => {
  const [contentInput, setcontentInput] = useState("");

  const input_search_ =
    disable === true ? "input_search_disable_" : "input_search_";

  const handleClick = () => {
    setcontentInput("");
    if (changeData) {
      changeData!();
    }
  };

  const handleChangeInput = (valueInput: string) => {
    setcontentInput(valueInput);
    onChange!(valueInput);
  };

  const sizeCloseIcon = {
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
    },
  };

  const sizeSearchIcon = {
    large: {
      width: 20,
      height: 20,
    },
    default: {
      width: 17,
      height: 17,
    },
    small: {
      width: 14,
      height: 14,
    },
    micro: {
      width: 14,
      height: 14,
    },
  };

  return (
    <form className={styles["form_search_" + type]}>
      {label && <label className={styles["label_" + type]}>{label}</label>}
      <div className={styles.search_field}>
        <input
          value={contentInput}
          className={styles[input_search_ + type]}
          type="text"
          name="search"
          placeholder={placeholder}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleChangeInput(event.target.value);
          }}
        />
        <div className={styles["reset_input_" + type]}>
          {hasIcon && contentInput.length > 0 && (
            <>
              <CloseOutlinedIcon
                style={sizeCloseIcon[type]}
                className={styles["filled_input_" + type]}
                onClick={() => handleClick()}
              />

              <div className={styles["divider_input_" + type]} />
            </>
          )}
        </div>
        <SearchOutlinedIcon
          style={sizeSearchIcon[type]}
          className={styles["searchIcon_input_" + type]}
        />
      </div>
      {caption && <label className={styles.caption}>{caption}</label>}
    </form>
  );
};

export default InputSearch;
