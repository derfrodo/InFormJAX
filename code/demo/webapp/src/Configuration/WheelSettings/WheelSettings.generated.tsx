import { UpdateWheelSettingsInputType } from "./UpdateWheelSettingsMutationReturnType"
import { IntCell, IntInput,  } from "./../InForm/atoms/IntCell"
import { Scalars,  } from "./../../gql/generated-client/graphql"
import { useState, useEffect } from "react"
import { UpdateWheelSettingsMutationReturnType } from "./UpdateWheelSettingsMutationReturnType"

export const WheelSettingsTable = (props: { 
    items: UpdateWheelSettingsInputType[];
    onRowClicked?: (item: UpdateWheelSettingsInputType) => Promise<void> | void
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
            </tr>)}
    </tbody>
    </table>;
}
export const UpdateWheelSettingsForm = (props: { 
    item: UpdateWheelSettingsMutationReturnType
    onSave?: (next: UpdateWheelSettingsInputType) => Promise<void> | void
}) => {
    const { item, onSave = () => {} } = props;
    const [current, setCurrent] = useState({ ...item });
    useEffect(() => {
    setCurrent({ ...item });
    }, [item]);

    return <form style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <button
        onClick={async (e) => {
          e.preventDefault();
          const next = projectToWheelSettingsInput(current);
          await onSave(next);
        }}
      >Save</button>
    </form>;
}

export function projectToWheelSettingsInput(details: UpdateWheelSettingsMutationReturnType): UpdateWheelSettingsInputType {
  return {
    radius: details.radius,
    rotationDurationInner: details.rotationDurationInner,
    rotationDurationNotPlaying: details.rotationDurationNotPlaying,
    rotationDurationPlaying: details.rotationDurationPlaying,
  }
}

