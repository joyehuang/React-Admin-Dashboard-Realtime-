import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { RefineThemes, useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import { resources } from "./config/resources";
import { dataProvider, liveProvider, authProvider } from "./providers";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp, ConfigProvider} from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Home, Login, Register, ForgotPassword } from "./pages";
import Layout from "./component";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <ConfigProvider theme={RefineThemes.Blue}>
      <RefineKbarProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "FhhiMC-4cxvTr-KPRbI1",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route 
                    element={<Authenticated 
                    key="authenticated-layout" 
                    fallback={<CatchAllNavigate to="/login" />} 
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  } 
                    >
                      <Route index element={<Home />} />
                    </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </RefineKbarProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
