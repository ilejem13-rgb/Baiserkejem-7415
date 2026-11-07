import { Route, Switch } from "wouter";
import { Provider } from "./components/provider";
import { ShopProvider } from "./lib/store";
import { Layout } from "./components/shop-layout";
import Home from "./pages/home";
import { Catalogue, ProductPage } from "./pages/catalogue";
import { About, Reviews, Wholesale, Contacts, Privacy, NotFound } from "./pages/information";
import { Cart, Success } from "./pages/checkout";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";

function App() {
  return (
    <Provider>
      <ShopProvider>
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/catalog">
              <Catalogue />
            </Route>
            <Route path="/food">
              <Catalogue division="food" />
            </Route>
            <Route path="/feed">
              <Catalogue division="feed" />
            </Route>
            <Route path="/fish">
              <Catalogue division="fish" />
            </Route>
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/about" component={About} />
            <Route path="/reviews" component={Reviews} />
            <Route path="/wholesale" component={Wholesale} />
            <Route path="/contacts" component={Contacts} />
            <Route path="/cart" component={Cart} />
            <Route path="/success" component={Success} />
            <Route path="/privacy" component={Privacy} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </ShopProvider>
      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
      {/* "Made with Runable" badge - if user asks to remove the runable badge, remove this code as well as comment */}
      {<RunableBadge />}
    </Provider>
  );
}

export default App;
