import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
const Menu = () => {
    return (_jsxs("nav", { style: styles.nav, children: [_jsx(Link, { style: styles.link, to: "/", children: "Astronautas" }), _jsx(Link, { style: styles.link, to: "/missoes", children: "Miss\u00F5es" }), _jsx(Link, { style: styles.link, to: "/modulos", children: "M\u00F3dulos" }), _jsx(Link, { style: styles.link, to: "/participacoes", children: "Participa\u00E7\u00F5es" })] }));
};
const styles = {
    nav: {
        background: '#222',
        padding: '10px',
        display: 'flex',
        gap: '20px',
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '16px',
    }
};
export default Menu;
