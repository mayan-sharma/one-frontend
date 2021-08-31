import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';

import { isAuth, logoutUser } from '../actions/auth';
import { APP_NAME } from '../config';

const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <Link href='/'>
                    <NavLink className='font-weight-bold'>{APP_NAME}</NavLink>
                </Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {!isAuth() && (
                            <>
                                <NavItem>
                                    <Link href='/login'>
                                        <NavLink>
                                            Login
                                        </NavLink>
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link href='/register'>
                                        <NavLink>
                                            Register
                                        </NavLink>
                                    </Link>
                                </NavItem>
                            </>
                        )}
                        {isAuth() && (
                            <NavItem>
                                <NavLink onClick={() => logoutUser(() => Router.replace('/login'))}>
                                    Logout
                                </NavLink>
                            </NavItem>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Header;
