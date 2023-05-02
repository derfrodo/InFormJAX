import { ReturnedWheelPartArrayElement } from "./ReturnedWheelPartArrayElement"
import { StringInput,  } from "./../InForm/atoms/StringInput"
import { StringCell,  } from "./../InForm/atoms/StringCell"
import { ImageCell,  } from "./../InForm/atoms/ImageCell"
import { BoolCell,  } from "./../InForm/atoms/BoolCell"
import { BoolInput,  } from "./../InForm/atoms/BoolInput"
import { useState, useEffect } from "react"

export const WheelPartArrayElementTable = (props: { 
    items: ReturnedWheelPartArrayElement[];
    onRowClicked?: (item: ReturnedWheelPartArrayElement) => Promise<void> | void
}) => {
    return <table style={{ borderSpacing: 4, }}>
    <thead>
        <tr>
            <th>win</th>
            <th>disabled</th>
            <th>name</th>
            <th>imagePath</th>
            <th>imageText</th>
            <th>winText</th>
        </tr>
    </thead>
    <tbody>
        {props.items.map((item, index)=>
            <tr key={index} onClick={() => props.onRowClicked && props.onRowClicked(item)}>
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
            </tr>)}
    </tbody>
    </table>;
}
export const UpdateWheelPartArrayElementForm = (props: { 
    title?: React.ReactNode;
    item: ReturnedWheelPartArrayElement
    onSave?: (next: ReturnedWheelPartArrayElement) => Promise<void> | void
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
    }}>
    {typeof title === "string" ? <h2 style={{ 
        marginTop: -4,
        marginBottom: -8,
    }} >{title}</h2> : title}
        <StringInput
            onChange={(next) => setCurrent(p => ({ ...p, name: next }))}
            item={item}
            name={"name"}
            value={current.name}
        />
        <StringInput
            onChange={(next) => setCurrent(p => ({ ...p, imagePath: next }))}
            item={item}
            name={"imagePath"}
            value={current.imagePath}
        />
        <StringInput
            onChange={(next) => setCurrent(p => ({ ...p, imageText: next }))}
            item={item}
            name={"imageText"}
            value={current.imageText}
        />
        <StringInput
            onChange={(next) => setCurrent(p => ({ ...p, winText: next }))}
            item={item}
            name={"winText"}
            value={current.winText}
        />
      <button
        onClick={async (e) => {
          e.preventDefault();
          const next = current;
          await onSave(next);
        }}
        style={{ 
        width: 150,
        borderRadius: 4,
        padding: 8,
    }}
      >Save</button>
    </form>;
}

