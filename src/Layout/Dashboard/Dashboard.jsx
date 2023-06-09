import { NavLink, Outlet } from "react-router-dom";
import { FaShoppingCart, FaWallet, FaHome, FaCalendar, FaUtensils, FaUsers } from 'react-icons/fa';
import { TfiMenuAlt } from "react-icons/tfi";
import useCart from "../../hooks/useCart";
import useAdmin from "../../hooks/useAdmin";


const Dashboard = () => {

    const [cart] = useCart()

    // const isAdmin = true;
    const [isAdmin] = useAdmin()
    // console.log(isAdmin)

    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* <!-- Page content here --> */}
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-[#D1A054] text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    {
                        isAdmin ?
                            <>
                                <li><NavLink to='/dashboard/adminHome'><FaHome></FaHome> Admin Home</NavLink></li>
                                <li><NavLink to='/dashboard/addItems'><FaUtensils></FaUtensils> Add Items</NavLink></li>
                                <li><NavLink to='/dashboard/manageItems'><TfiMenuAlt></TfiMenuAlt> Manage Items</NavLink></li>
                                <li><NavLink to='/dashboard/allUsers'><FaUsers></FaUsers> All Users</NavLink></li>
                            </> :
                            <>
                                <li><NavLink to='/dashboard/reservation'><FaCalendar></FaCalendar> Reservation</NavLink></li>
                                <li><NavLink to='/dashboard/paymentHistory'><FaWallet></FaWallet> Payment History</NavLink></li>
                                <li><NavLink to='/dashboard/myCart'><FaShoppingCart></FaShoppingCart> My Cart <span className="indicator-item badge badge-secondary">+{cart?.length}</span></NavLink></li>
                            </>
                    }
                    <hr />
                    <li><NavLink to='/'><FaHome></FaHome> Home</NavLink></li>
                    <li><NavLink to='/ourMenu'><TfiMenuAlt></TfiMenuAlt> Menu</NavLink></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;