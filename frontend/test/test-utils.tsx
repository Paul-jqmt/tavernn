import {BrowserRouter} from "react-router-dom";
import {UserProvider} from "../src/contexts/UserContext";
import {render, RenderOptions} from "@testing-library/react";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <BrowserRouter>
            <UserProvider>
                {children}
            </UserProvider>
        </BrowserRouter>
    );
};

const customRender = (
    ui: React.ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
)=> render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export {customRender as render};