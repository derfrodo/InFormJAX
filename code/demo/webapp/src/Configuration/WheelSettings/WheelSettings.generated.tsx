import { UpdateWheelSettingsInputType } from "./UpdateWheelSettingsMutationReturnType"
import { IntInput, IntCell,  } from "./../InForm/atoms/IntCell"
import { Scalars,  } from "./../../gql/generated-client/graphql"
import { useState, useEffect } from "react"
import { UpdateWheelSettingsMutationReturnType } from "./UpdateWheelSettingsMutationReturnType"

export const WheelSettingsTable = (props: { 
    actionsComponent?: React.ComponentType<{ item: UpdateWheelSettingsMutationReturnType }>;
    items: UpdateWheelSettingsMutationReturnType[];
    onRowClicked?: (item: UpdateWheelSettingsMutationReturnType) => Promise<void> | void
}) => {
    const ActionsComponent = props.actionsComponent;
    return <table style={{ borderSpacing: 4, }}>
    <thead>
        <tr>
            {ActionsComponent ? <th></th> : <></>}
            <th>radius</th>
            <th>rotationDurationInner</th>
            <th>rotationDurationNotPlaying</th>
            <th>rotationDurationPlaying</th>
            <th>minClickDelayMS</th>
            <th>__typename</th>
        </tr>
    </thead>
    <tbody>
        {props.items.map((item, index)=>
            <tr key={index} onClick={() => props.onRowClicked && props.onRowClicked(item)}>
                {ActionsComponent ? <td><ActionsComponent item={item}/></td> : <></>}
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
                    <IntCell
                        item={item}
                        name={"minClickDelayMS"}
                        value={item.minClickDelayMS}
                    />
            </tr>)}
    </tbody>
    </table>;
}
export const UpdateWheelSettingsForm = (props: { 
    title?: React.ReactNode;
    item: UpdateWheelSettingsMutationReturnType
    onSave?: (next: UpdateWheelSettingsInputType) => Promise<void> | void
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
          const next = projectToWheelSettingsInput(current);
          await onSave(next);
        }}
    >
    {typeof title === "string" ? <h3 style={{ 
        marginTop: -4,
        marginBottom: -8,
    }} >{title}</h3> : title}
        <IntInput
            required={true}
            onChange={(next) => setCurrent(p => ({ ...p, radius: next }))}
            item={item}
            name={"radius"}
            value={current.radius}
        />
        <IntInput
            required={true}
            onChange={(next) => setCurrent(p => ({ ...p, rotationDurationInner: next }))}
            item={item}
            name={"rotationDurationInner"}
            value={current.rotationDurationInner}
        />
        <IntInput
            required={true}
            onChange={(next) => setCurrent(p => ({ ...p, rotationDurationNotPlaying: next }))}
            item={item}
            name={"rotationDurationNotPlaying"}
            value={current.rotationDurationNotPlaying}
        />
        <IntInput
            required={true}
            onChange={(next) => setCurrent(p => ({ ...p, rotationDurationPlaying: next }))}
            item={item}
            name={"rotationDurationPlaying"}
            value={current.rotationDurationPlaying}
        />
        <IntInput
            required={true}
            onChange={(next) => setCurrent(p => ({ ...p, minClickDelayMS: next }))}
            item={item}
            name={"minClickDelayMS"}
            value={current.minClickDelayMS}
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

export function projectToWheelSettingsInput(details: UpdateWheelSettingsMutationReturnType): UpdateWheelSettingsInputType {
  return {
    minClickDelayMS: details.minClickDelayMS,
    radius: details.radius,
    rotationDurationInner: details.rotationDurationInner,
    rotationDurationNotPlaying: details.rotationDurationNotPlaying,
    rotationDurationPlaying: details.rotationDurationPlaying,
  }
}
