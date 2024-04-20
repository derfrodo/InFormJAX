import { UpdateWheelPartInput } from "../../../generated-client/graphql"
import { BoolInput,  } from "./../InForm/atoms/BoolInput"
import { StringCell,  } from "./../InForm/atoms/StringCell"
import { ImageCell,  } from "./../InForm/atoms/ImageCell"
import { StringInput,  } from "./../InForm/atoms/StringInput"
import { BoolCell,  } from "./../InForm/atoms/BoolCell"
import { IntInput, IntCell,  } from "./../InForm/atoms/IntCell"
import { Scalars, InputMaybe,  } from "./../../../generated-client/graphql"
import { useState, useEffect } from "react"
import { ReturnedWheelPartArrayElement } from "./ReturnedWheelPartArrayElement"

export const UpdateWheelPartTable = (props: { 
    actionsComponent?: React.ComponentType<{ item: ReturnedWheelPartArrayElement }>;
    items: ReturnedWheelPartArrayElement[];
    onRowClicked?: (item: ReturnedWheelPartArrayElement) => Promise<void> | void
}) => {
    const ActionsComponent = props.actionsComponent;
    return <table style={{ borderSpacing: 4, }}>
    <thead>
        <tr>
            {ActionsComponent ? <th></th> : <></>}
            <th>win</th>
            <th>disabled</th>
            <th>name</th>
            <th>imagePath</th>
            <th>imageText</th>
            <th>winText</th>
            <th>id</th>
            <th>winChance</th>
        </tr>
    </thead>
    <tbody>
        {props.items.map((item, index)=>
            <tr key={index} onClick={() => props.onRowClicked && props.onRowClicked(item)}>
                {ActionsComponent ? <td><ActionsComponent item={item}/></td> : <></>}
                    <BoolCell
                        item={item}
                        name={"win"}
                        value={item.win}
                    />
                    <BoolCell
                        item={item}
                        name={"disabled"}
                        value={item.disabled}
                    />
                    <StringCell
                        item={item}
                        name={"name"}
                        value={item.name}
                    />
                    <ImageCell
                        item={item}
                        name={"imagePath"}
                        value={item.imagePath}
                    />
                    <StringCell
                        item={item}
                        name={"imageText"}
                        value={item.imageText}
                    />
                    <StringCell
                        item={item}
                        name={"winText"}
                        value={item.winText}
                    />
                    <StringCell
                        item={item}
                        name={"id"}
                        value={item.id}
                    />
                    <IntCell
                        item={item}
                        name={"winChance"}
                        value={item.winChance}
                    />
            </tr>)}
    </tbody>
    </table>;
}
export const UpdateUpdateWheelPartForm = (props: { 
    title?: React.ReactNode;
    item: ReturnedWheelPartArrayElement
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
          const next = projectToUpdateWheelPartInput(current);
          await onSave(next);
        }}
    >
    {typeof title === "string" ? <h3 style={{ 
        marginTop: -4,
        marginBottom: -8,
    }} >{title}</h3> : title}
        <BoolInput
            required={true}
            onChange={(next) => setCurrent(p => ({ ...p, win: next }))}
            item={item}
            name={"win"}
            value={current.win}
        />
        <BoolInput
            required={true}
            onChange={(next) => setCurrent(p => ({ ...p, disabled: next }))}
            item={item}
            name={"disabled"}
            value={current.disabled}
        />
        <StringInput
            required={true}
            onChange={(next) => setCurrent(p => ({ ...p, name: next }))}
            item={item}
            name={"name"}
            value={current.name}
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
            required={false}
            onChange={(next) => setCurrent(p => ({ ...p, winText: next }))}
            item={item}
            name={"winText"}
            value={current.winText}
        />
        <StringCell
            required={true}
            onChange={(next) => setCurrent(p => ({ ...p, id: next }))}
            item={item}
            name={"id"}
            value={current.id}
        />
        <IntInput
            required={true}
            onChange={(next) => setCurrent(p => ({ ...p, winChance: next }))}
            item={item}
            name={"winChance"}
            value={current.winChance}
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

export function projectToUpdateWheelPartInput(details: ReturnedWheelPartArrayElement): UpdateWheelPartInput {
  return {
    disabled: details.disabled,
    id: details.id,
    imagePath: details.imagePath,
    imageText: details.imageText,
    name: details.name,
    win: details.win,
    winChance: details.winChance,
    winText: details.winText,
  }
}
