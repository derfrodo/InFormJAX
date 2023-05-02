import { UpdateWheelSettingsMutationReturnType } from "./UpdateWheelSettingsMutationReturnType"
import { IntCell, IntInput,  } from "./../InForm/atoms/IntCell"
import { useState, useEffect } from "react"


export const DisplaySettingsTable = (props: { 
    items: UpdateWheelSettingsMutationReturnType[];
    onRowClicked?: (item: UpdateWheelSettingsMutationReturnType) => Promise<void> | void
}) => {
    return <table style={{ borderSpacing: 4, }}>
    <thead>
        <tr>
            <th>radius</th>
            <th>rotationDurationInner</th>
            <th>rotationDurationNotPlaying</th>
            <th>rotationDurationPlaying</th>
        </tr>
    </thead>
    <tbody>
        {props.items.map((item, index)=>
            <tr key={index} onClick={() => props.onRowClicked && props.onRowClicked(item)}>
                    <IntCell
                        item={item}
                        name={"radius"}
                        value={item.radius}
                    />
                    <IntCell
                        item={item}
                        name={"rotationDurationInner"}
                        value={item.rotationDurationInner}
                    />
                    <IntCell
                        item={item}
                        name={"rotationDurationNotPlaying"}
                        value={item.rotationDurationNotPlaying}
                    />
                    <IntCell
                        item={item}
                        name={"rotationDurationPlaying"}
                        value={item.rotationDurationPlaying}
                    />
            </tr>)}
    </tbody>
    </table>;
}
export const UpdateDisplaySettingsForm = (props: { 
    item: UpdateWheelSettingsMutationReturnType;
    onSave?: (next: UpdateWheelSettingsMutationReturnType) => Promise<void> | void
}) => {
    const { item, onSave = () => {} } = props;
    const [current, setCurrent] = useState({ ...item });
    useEffect(() => {
    setCurrent({ ...item });
    }, [item]);

    return <form style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <IntInput
            onChange={(next) => setCurrent(p => ({ ...p, radius: next }))}
            item={item}
            name={"radius"}
            value={current.radius}
        />
        <IntInput
            onChange={(next) => setCurrent(p => ({ ...p, rotationDurationInner: next }))}
            item={item}
            name={"rotationDurationInner"}
            value={current.rotationDurationInner}
        />
        <IntInput
            onChange={(next) => setCurrent(p => ({ ...p, rotationDurationNotPlaying: next }))}
            item={item}
            name={"rotationDurationNotPlaying"}
            value={current.rotationDurationNotPlaying}
        />
        <IntInput
            onChange={(next) => setCurrent(p => ({ ...p, rotationDurationPlaying: next }))}
            item={item}
            name={"rotationDurationPlaying"}
            value={current.rotationDurationPlaying}
        />
      <button
        onClick={async (e) => {
          e.preventDefault();
          await onSave(current);
        }}
      >Save</button>
    </form>;
}
