import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';

import { isAuth, logoutUser } from '../actions/auth';
import { APP_NAME } from '../config';
import Search from './blog/Search';

const Header = () => {
    
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Navbar color="light" light expand="md">
                <Link href='/'>
                    <NavLink className='font-weight-bold'>{APP_NAME}</NavLink>
                </Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link href={'/blogs'}>
                                <NavLink>
                                    Blogs
                                </NavLink>
                            </Link>
                        </NavItem>
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
                            <>
                                <NavItem>
                                    <Link href={isAuth().role === 1 ? '/admin' : '/user'}>
                                        <NavLink>
                                            Dashboard
                                        </NavLink>
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <NavLink onClick={() => logoutUser(() => Router.replace('/login'))}>
                                        Logout
                                    </NavLink>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                </Collapse>
            </Navbar>
            <Search />
        </>
    );
}

export default Header;
