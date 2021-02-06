import '../../assests/styles/menu.css';
import Group from '../atoms/group';
import Dm from '../atoms/dm';
import useMenu from '../logic/useMenu';
function Menu() {
    const {
        groups,
        dms
    } = useMenu();
    return (
        <div className="menu">
            <div className="menu-title">
                Hyper Chat
            </div>
            <div className="groups">
                <div className="group-title">
                    Groups
                </div>
                <Group />
            </div>
            <div className="dms">
                <div className="dm-title">
                    Direct Messages
                </div>
                <Dm />
            </div>
        </div>
    );
}
export default Menu;