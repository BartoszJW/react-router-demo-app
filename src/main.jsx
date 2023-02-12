import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/root.jsx";
import ErrorPage from "./error-page.jsx";
import Contact, {loader as contactLoader, action as contactAction} from "./routes/contact.jsx";
import {loader as rootLoader, action as rootAction} from "./routes/root.jsx";
import EditContact, {action as editAction,} from "./routes/edit.jsx";
import {action as destroyAction} from "./routes/destroy";
import Index from "./routes/index.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        loader: rootLoader,
        action: rootAction,
        children: [
            {
                errorElement: <ErrorPage/>,
                children: [
                    {
                        index: true,
                        element: <Index/>,
                    },
                    {
                        path: "contacts/:contactId",
                        element: <Contact/>,
                        loader: contactLoader,
                        action: contactAction,
                    },
                    {
                        path: "contacts/:contactId/edit",
                        element: <EditContact/>,
                        loader: contactLoader,
                        action: editAction,
                    },
                    {
                        path: "contacts/:contactId/destroy",
                        action: destroyAction,
                        errorElement: <div>Oops, there was an error!</div>,
                    },
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

//the same as above in other form - configuring routes with jsx
// import {
//     createRoutesFromElements,
//     createBrowserRouter,
// } from "react-router-dom";
//
// const router = createBrowserRouter(
//     createRoutesFromElements(
//         <Route
//             path="/"
//             element={<Root />}
//             loader={rootLoader}
//             action={rootAction}
//             errorElement={<ErrorPage />}
//         >
//             <Route errorElement={<ErrorPage />}>
//                 <Route index element={<Index />} />
//                 <Route
//                     path="contacts/:contactId"
//                     element={<Contact />}
//                     loader={contactLoader}
//                     action={contactAction}
//                 />
//                 <Route
//                     path="contacts/:contactId/edit"
//                     element={<EditContact />}
//                     loader={contactLoader}
//                     action={editAction}
//                 />
//                 <Route
//                     path="contacts/:contactId/destroy"
//                     action={destroyAction}
//                 />
//             </Route>
//         </Route>
//     )
// );