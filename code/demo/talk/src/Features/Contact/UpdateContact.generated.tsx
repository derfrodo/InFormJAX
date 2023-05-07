import { UpdateContactInput } from "../../gql/generated-client/graphql"
import { StringInput,  } from "./../../Configuration/InForm/atoms/StringInput"
import { StringCell,  } from "./../../Configuration/InForm/atoms/StringCell"
import { Scalars,  } from "./../../gql/generated-client/graphql"
import { useState, useEffect } from "react"
import { ReturnedContactArrayElement } from "./ContactObject"

export const UpdateContactTable = (props: { 
    items: ReturnedContactArrayElement[];
    onRowClicked?: (item: ReturnedContactArrayElement) => Promise<void> | void
}) => {
    return <table style={{ borderSpacing: 4, }}>
    <thead>
        <tr>
            <th>email</th>
            <th>firstName</th>
            <th>lastName</th>
        </tr>
    </thead>
    <tbody>
        {props.items.map((item, index)=>
            <tr key={item.id} onClick={() => props.onRowClicked && props.onRowClicked(item)}>
                    <StringCell
                        item={item}
                        name={"email"}
                        value={item.email}
                    />
                    <StringCell
                        item={item}
                        name={"firstName"}
                        value={item.firstName}
                    />
                    <StringCell
                        item={item}
                        name={"lastName"}
                        value={item.lastName}
                    />
            </tr>)}
    </tbody>
    </table>;
}
export const UpdateUpdateContactForm = (props: { 
    title?: React.ReactNode;
    item: ReturnedContactArrayElement
    onSave?: (next: UpdateContactInput) => Promise<void> | void
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
          const next = projectToUpdateContactInput(current);
          await onSave(next);
        }}
    >
    {typeof title === "string" ? <h3 style={{ 
        marginTop: -4,
        marginBottom: -8,
    }} >{title}</h3> : title}
        <StringInput
            required={true}
            onChange={(next) => setCurrent(p => ({ ...p, email: next }))}
            item={item}
            name={"email"}
            value={current.email}
        />
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
      <button
        style={{ 
        width: 150,
        borderRadius: 4,
        padding: 8,
    }}
      >Save</button>
    </form>;
}

export function projectToUpdateContactInput(details: ReturnedContactArrayElement): UpdateContactInput {
  return {
    email: details.email,
    firstName: details.firstName,
    id: details.id,
    lastName: details.lastName,
  }
}
