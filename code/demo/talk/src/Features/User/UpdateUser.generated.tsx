import { UpdateUserInput } from "../../gql/generated-client/graphql"
import { StringInput,  } from "./../../Configuration/InForm/atoms/StringInput"
import { StringCell,  } from "./../../Configuration/InForm/atoms/StringCell"
import { Scalars, InputMaybe,  } from "./../../gql/generated-client/graphql"
import { useState, useEffect } from "react"
import { ReturnedUserArrayElement } from "./UserObject"

export const UpdateUserTable = (props: { 
    items: ReturnedUserArrayElement[];
    onRowClicked?: (item: ReturnedUserArrayElement) => Promise<void> | void
}) => {
    return <table style={{ borderSpacing: 4, }}>
    <thead>
        <tr>
            <th>firstName</th>
            <th>lastName</th>
            <th>nickName</th>
            <th>displayName</th>
        </tr>
    </thead>
    <tbody>
        {props.items.map((item, index)=>
            <tr key={item.id} onClick={() => props.onRowClicked && props.onRowClicked(item)}>
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
                    <StringCell
                        item={item}
                        name={"nickName"}
                        value={item.nickName}
                    />
                    <StringCell
                        item={item}
                        name={"displayName"}
                        value={item.displayName}
                    />
            </tr>)}
    </tbody>
    </table>;
}
export const UpdateUpdateUserForm = (props: { 
    title?: React.ReactNode;
    item: ReturnedUserArrayElement
    onSave?: (next: UpdateUserInput) => Promise<void> | void
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
          const next = projectToUpdateUserInput(current);
          await onSave(next);
        }}
    >
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
            required={false}
            onChange={(next) => setCurrent(p => ({ ...p, nickName: next }))}
            item={item}
            name={"nickName"}
            value={current.nickName}
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

export function projectToUpdateUserInput(details: ReturnedUserArrayElement): UpdateUserInput {
  return {
    firstName: details.firstName,
    id: details.id,
    lastName: details.lastName,
    nickName: details.nickName,
  }
}
