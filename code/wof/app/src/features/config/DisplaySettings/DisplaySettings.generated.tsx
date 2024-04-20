/* eslint-disable */

import { DisplaySettingsInput } from "../../../generated-client/graphql"
import { IntInput, IntCell,  } from "./../InForm/atoms/IntCell"
import { Scalars,  } from "./../../../generated-client/graphql"
import { useState, useEffect } from "react"
import { UpdateDisplaySettingsMutationReturnType } from "./UpdateDisplaySettingsMutationReturnType"

export const DisplaySettingsTable = (props: { 
    actionsComponent?: React.ComponentType<{ item: UpdateDisplaySettingsMutationReturnType }>;
    items: UpdateDisplaySettingsMutationReturnType[];
    onRowClicked?: (item: UpdateDisplaySettingsMutationReturnType) => Promise<void> | void
}) => {
    const ActionsComponent = props.actionsComponent;
    return <table style={{ borderSpacing: 4, }}>
    <thead>
        <tr>
            {ActionsComponent ? <th></th> : <></>}
            <th>showResultAfterMS</th>
            <th>showResultForMS</th>
        </tr>
    </thead>
    <tbody>
        {props.items.map((item, index)=>
            <tr key={index} onClick={() => props.onRowClicked && props.onRowClicked(item)}>
                {ActionsComponent ? <td><ActionsComponent item={item}/></td> : <></>}
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
    title?: React.ReactNode;
    item: UpdateDisplaySettingsMutationReturnType
    onSave?: (next: DisplaySettingsInput) => Promise<void> | void
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
          const next = projectToDisplaySettingsInput(current);
          await onSave(next);
        }}
    >
    {typeof title === "string" ? <h3 style={{ 
        marginTop: -4,
        marginBottom: -8,
    }} >{title}</h3> : title}
        <IntInput
            required={true}
            onChange={(next) => setCurrent(p => ({ ...p, showResultAfterMS: next }))}
            item={item}
            name={"showResultAfterMS"}
            value={current.showResultAfterMS}
        />
        <IntInput
            required={true}
            onChange={(next) => setCurrent(p => ({ ...p, showResultForMS: next }))}
            item={item}
            name={"showResultForMS"}
            value={current.showResultForMS}
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

export function projectToDisplaySettingsInput(details: UpdateDisplaySettingsMutationReturnType): DisplaySettingsInput {
  return {
    showResultAfterMS: details.showResultAfterMS,
    showResultForMS: details.showResultForMS,
  }
}
