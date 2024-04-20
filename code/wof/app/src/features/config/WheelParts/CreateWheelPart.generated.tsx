import { UpdateWheelPartInput } from "../../../generated-client/graphql"
import { BoolInput,  } from "./../InForm/atoms/BoolInput"
import { StringCell,  } from "./../InForm/atoms/StringCell"
import { ImageCell,  } from "./../InForm/atoms/ImageCell"
import { StringInput,  } from "./../InForm/atoms/StringInput"
import { IntInput,  } from "./../InForm/atoms/IntCell"
import { Scalars, InputMaybe,  } from "./../../../generated-client/graphql"
import { useState, useEffect } from "react"


export const CreateCreateWheelPartForm = (props: { 
    title?: React.ReactNode;
    item: UpdateWheelPartInput
    onSave?: (next: UpdateWheelPartInput) => Promise<void> | void
}) => {
    const { title, item, onSave = () => {} } = props;
    const [current, setCurrent] = useState({ ...item });
    useEffect(() => {
    setCurrent({ ...item });
    }, [item]);

    return <form style={{ 
        display: "flex",
        flexDirection: "column",
        gap: 16,
        flexWrap: "wrap",
        borderRadius: 4,
        padding: 8,
        border: "1px solid black",
        marginTop: 8,
        maxWidth: 300,
    }}
    onSubmit={async (e) => {
          e.preventDefault();
          const next = current;
          await onSave(next);
        }}
    >
    {typeof title === "string" ? <h3 style={{ 
        marginTop: -4,
        marginBottom: -8,
    }} >{title}</h3> : title}
        <BoolInput
            required={true}
            onChange={(next) => setCurrent(p => ({ ...p, disabled: next }))}
            item={item}
            name={"disabled"}
            value={current.disabled}
        />
        <StringCell
            required={true}
            onChange={(next) => setCurrent(p => ({ ...p, id: next }))}
            item={item}
            name={"id"}
            value={current.id}
        />
        <StringInput
            required={false}
            onChange={(next) => setCurrent(p => ({ ...p, imagePath: next }))}
            item={item}
            name={"imagePath"}
            value={current.imagePath}
        />
        <StringInput
            required={false}
            onChange={(next) => setCurrent(p => ({ ...p, imageText: next }))}
            item={item}
            name={"imageText"}
            value={current.imageText}
        />
        <StringInput
            required={true}
            onChange={(next) => setCurrent(p => ({ ...p, name: next }))}
            item={item}
            name={"name"}
            value={current.name}
        />
        <BoolInput
            required={true}
            onChange={(next) => setCurrent(p => ({ ...p, win: next }))}
            item={item}
            name={"win"}
            value={current.win}
        />
        <IntInput
            required={true}
            onChange={(next) => setCurrent(p => ({ ...p, winChance: next }))}
            item={item}
            name={"winChance"}
            value={current.winChance}
        />
        <StringInput
            required={false}
            onChange={(next) => setCurrent(p => ({ ...p, winText: next }))}
            item={item}
            name={"winText"}
            value={current.winText}
        />
      <button
        style={{ 
        width: 150,
        borderRadius: 4,
        padding: 8,
    }}
      >Save</button>
    </form>;
}

export function createDefaultCreateWheelPartInput(): UpdateWheelPartInput {
  return {
    disabled: false,
    id: "",
    imagePath: "",
    imageText: "",
    name: "",
    win: false,
    winChance: 0,
    winText: "",
  }
}

