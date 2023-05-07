import { UpdateDisplaySettingsMutationReturnType } from "./UpdateDisplaySettingsMutationReturnType"
import { IntCell, IntInput,  } from "./../InForm/atoms/IntCell"
import { useState, useEffect } from "react"


export const CreateDisplaySettingsForm = (props: { 
    title?: React.ReactNode;
    item: UpdateDisplaySettingsMutationReturnType
    onSave?: (next: UpdateDisplaySettingsMutationReturnType) => Promise<void> | void
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

export function createDefaultDisplaySettingsInput(): UpdateDisplaySettingsMutationReturnType {
  return {
    __typename: ,
    showResultAfterMS: 0,
    showResultForMS: 0,
  }
}

