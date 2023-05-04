import { CreateUserInput } from "../../gql/generated-client/graphql"
import { StringInput,  } from "./../../Configuration/InForm/atoms/StringInput"
import { StringCell,  } from "./../../Configuration/InForm/atoms/StringCell"
import { Scalars, InputMaybe,  } from "./../../gql/generated-client/graphql"
import { useState, useEffect } from "react"


export const CreateCreateUserForm = (props: { 
    title?: React.ReactNode;
    item: CreateUserInput
    onSave?: (next: CreateUserInput) => Promise<void> | void
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
    }}>
    {typeof title === "string" ? <h3 style={{ 
        marginTop: -4,
        marginBottom: -8,
    }} >{title}</h3> : title}
        <StringInput
            required={true}
            onChange={(next) => setCurrent(p => ({ ...p, firstName: next }))}
            item={item}
            name={"firstName"}
            value={current.firstName}
        />
        <StringInput
            required={true}
            onChange={(next) => setCurrent(p => ({ ...p, lastName: next }))}
            item={item}
            name={"lastName"}
            value={current.lastName}
        />
        <StringInput
            required={true}
            onChange={(next) => setCurrent(p => ({ ...p, nickName: next }))}
            item={item}
            name={"nickName"}
            value={current.nickName}
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

export function createDefaultCreateUserInput(): CreateUserInput {
  return {
    firstName: "",
    lastName: "",
    nickName: "",
  }
}

