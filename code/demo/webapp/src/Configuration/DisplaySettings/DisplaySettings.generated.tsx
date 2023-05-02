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
            <th>showResultAfterMS</th>
            <th>showResultForMS</th>
        </tr>
    </thead>
    <tbody>
        {props.items.map((item, index)=>
            <tr key={index} onClick={() => props.onRowClicked && props.onRowClicked(item)}>
                    <IntCell
                        item={item}
                        name={"showResultAfterMS"}
                        value={item.showResultAfterMS}
                    />
                    <IntCell
                        item={item}
                        name={"showResultForMS"}
                        value={item.showResultForMS}
                    />
            </tr>)}
    </tbody>
    </table>;
}
export const UpdateDisplaySettingsForm = (props: { 
    item: UpdateDisplaySettingsMutationReturnType
    onSave?: (next: UpdateDisplaySettingsMutationReturnType) => Promise<void> | void
}) => {
    const { item, onSave = () => {} } = props;
    const [current, setCurrent] = useState({ ...item });
    useEffect(() => {
    setCurrent({ ...item });
    }, [item]);

    return <form style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <IntInput
            onChange={(next) => setCurrent(p => ({ ...p, showResultAfterMS: next }))}
            item={item}
            name={"showResultAfterMS"}
            value={current.showResultAfterMS}
        />
        <IntInput
            onChange={(next) => setCurrent(p => ({ ...p, showResultForMS: next }))}
            item={item}
            name={"showResultForMS"}
            value={current.showResultForMS}
        />
      <button
        onClick={async (e) => {
          e.preventDefault();
          const next = current;
          await onSave(next);
        }}
      >Save</button>
    </form>;
}

