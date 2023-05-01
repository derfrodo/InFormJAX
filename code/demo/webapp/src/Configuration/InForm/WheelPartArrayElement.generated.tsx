import { ReturnedWheelPartArrayElement } from "./WheelPartType"
import { StringInput,  } from "./atoms/StringInput"
import { BoolInput,  } from "./atoms/BoolInput"


export const WheelPartArrayElementTable = (props: { items: ReturnedWheelPartArrayElement[]; }) => {
    return <table>
    <thead>
        <tr>
            <th>win</th>
            <th>name</th>
            <th>imagePath</th>
            <th>imageText</th>
            <th>winText</th>
        </tr>
    </thead>
    <tbody>
{        props.items.map((item, index)=>
            <tr key={index}>
                    <BoolInput
                        item={item}
                        name={"win"}
                        value={item.win}
                    />
                    <StringInput
                        item={item}
                        name={"name"}
                        value={item.name}
                    />
                    <StringInput
                        item={item}
                        name={"imagePath"}
                        value={item.imagePath}
                    />
                    <StringInput
                        item={item}
                        name={"imageText"}
                        value={item.imageText}
                    />
                    <StringInput
                        item={item}
                        name={"winText"}
                        value={item.winText}
                    />
            </tr>)
}    </tbody>
    </table>;
}