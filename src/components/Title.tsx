import React from "react";
import Style from "../style/title.module.scss"

interface Props {}

function Title(props: { title: string }) {
  const { title } = props;

    return <h1 className={Style.title}>{ title}</h1>;
}

export default Title;
