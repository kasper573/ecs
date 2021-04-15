import { MenuList, Paper } from "@material-ui/core";
import { cloneWithIndexAsKey } from "../../../ecs-common/src/cloneWithIndexAsKey";
import { Center } from "../components/Center";
import { useFileMenuItems } from "./FileMenu";

export const Home = () => {
  const menuItems = useFileMenuItems();
  return (
    <Center>
      <Paper>
        <MenuList>{menuItems.map(cloneWithIndexAsKey)}</MenuList>
      </Paper>
    </Center>
  );
};
