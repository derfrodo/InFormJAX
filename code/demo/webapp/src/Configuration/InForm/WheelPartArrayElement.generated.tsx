import { ReturnedWheelPartArrayElement } from "./WheelPartType";
import { StringInput } from "./atoms/StringInput";
import { StringCell } from "./atoms/StringCell";
import { BoolCell } from "./atoms/BoolCell";
import { BoolInput } from "./atoms/BoolInput";

export const WheelPartArrayElementTable = (props: {
  items: ReturnedWheelPartArrayElement[];
  onRowClicked: (item: ReturnedWheelPartArrayElement) => Promise<void> | void;
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>win</th>
          <th>disabled</th>
          <th>name</th>
          <th>imagePath</th>
          <th>imageText</th>
          <th>winText</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((item, index) => (
          <tr key={index} onClick={() => props.onRowClicked(item)}>
            <BoolCell item={item} name={"win"} value={item.win} />
            <BoolCell item={item} name={"disabled"} value={item.disabled} />
            <StringCell item={item} name={"name"} value={item.name} />
            <StringCell item={item} name={"imagePath"} value={item.imagePath} />
            <StringCell item={item} name={"imageText"} value={item.imageText} />
            <StringCell item={item} name={"winText"} value={item.winText} />
          </tr>
        ))}{" "}
      </tbody>
    </table>
  );
};
