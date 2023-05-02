import { UpdateDisplaySettingsMutationReturnType } from "./UpdateDisplaySettingsMutationReturnType"
import { IntCell, IntInput,  } from "./../InForm/atoms/IntCell"
import { useState, useEffect } from "react"


export const DisplaySettingsTable = (props: { 
    items: UpdateDisplaySettingsMutationReturnType[];
    onRowClicked?: (item: UpdateDisplaySettingsMutationReturnType) => Promise<void> | void
}) => {
    return <table style={{ borderSpacing: 4, }}>
    <thead>
        <tr>
            <th>showResultInMS</th>
        </tr>
    </thead>
    <tbody>
        {props.items.map((item, index)=>
            <tr key={index} onClick={() => props.onRowClicked && props.onRowClicked(item)}>
                    <IntCell
                        item={item}
                        name={"showResultInMS"}
                        value={item.showResultInMS}
                    />
            </tr>)}
    </tbody>
    </table>;
}
export const UpdateDisplaySettingsForm = (props: { 
    item: UpdateDisplaySettingsMutationReturnType;
    onSave?: (next: UpdateDisplaySettingsMutationReturnType) => Promise<void> | void
}) => {
    const { item, onSave = () => {} } = props;
    const [current, setCurrent] = useState({ ...item });
    useEffect(() => {
    setCurrent({ ...item });
    }, [item]);

    return <form style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <IntInput
            onChange={(next) => setCurrent(p => ({ ...p, showResultInMS: next }))}
            item={item}
            name={"showResultInMS"}
            value={current.showResultInMS}
        />
      <button
        onClick={async (e) => {
          e.preventDefault();
          await onSave(current);
        }}
      >Save</button>
    </form>;
}
