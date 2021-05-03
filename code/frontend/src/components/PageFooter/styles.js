import {createUseStyles} from "react-jss";

export const useCustomFooterStyles = createUseStyles({
    customFooterCls: {
        textAlign: "center",
        padding: "40px 0 40px 0",
        background: "radial-gradient(ellipse at center, #00416a 0%, #001122 100%)"
    },
    customFooterTextCls: {
        color: "white !important"
    }
});
