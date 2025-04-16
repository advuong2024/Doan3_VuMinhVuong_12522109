import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            <img src={`/layout/images/tooth.png`} alt="Logo" height="25" className="mr-2" />
            by
            <span className="font-medium ml-2">Minh Vuong</span>
        </div>
    );
};

export default AppFooter;
