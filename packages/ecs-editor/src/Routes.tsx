import { Route, Switch } from "react-router-dom";
import { EditorView } from "./views/EditorView/EditorView";
import { HomeView } from "./views/HomeView";
import { Layout } from "./layout/Layout";
import { NotFoundView } from "./views/NotFoundView";
import { EditorTitle } from "./views/EditorView/EditorTitle";
import { createGotoSystemDefinitionPath } from "./actions/createGotoSystemDefinition";

/**
 * All routes in the application.
 */
export const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Layout>
        <HomeView />
      </Layout>
    </Route>
    <Route path={createGotoSystemDefinitionPath(":id")}>
      <Layout title={<EditorTitle />}>
        <EditorView />
      </Layout>
    </Route>
    <Route path="*">
      <Layout>
        <NotFoundView />
      </Layout>
    </Route>
  </Switch>
);
