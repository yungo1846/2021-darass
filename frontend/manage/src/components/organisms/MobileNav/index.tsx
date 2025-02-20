import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE } from "../../../constants";
import { useUser } from "../../../hooks";
import { PALETTE } from "../../../styles/palette";
import { MenuType } from "../../../types/menu";
import { User } from "../../../types/user";
import HamburgerButton from "../../atoms/Buttons/HamburgerButton";
import Modal from "../../atoms/Modal";
import { Container, Menu, MenuAvatar, MenuWrapper, Name, AuthLink } from "./styles";

export interface Props {
  menuList: MenuType[];
}

const MobileNav = ({ menuList }: Props) => {
  const { user, logout } = useUser();

  const [isOpen, setOpen] = useState(false);

  const onToggleNav = () => {
    setOpen(state => !state);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "revert";
  }, [isOpen]);

  return (
    <Container>
      <HamburgerButton isOpen={isOpen} onClick={onToggleNav} />
      <Modal isOpen={isOpen} closeModal={() => setOpen(false)}>
        <MenuWrapper isOpen={isOpen}>
          <Link to={ROUTE.USER_PROFILE} onClick={onToggleNav}>
            <MenuAvatar imageURL={user?.profileImageUrl} size="LG" />
          </Link>
          {user ? (
            <>
              <Name>{user.nickName}</Name>
              <AuthLink
                to={ROUTE.HOME}
                onClick={() => {
                  logout();
                  onToggleNav();
                }}
              >
                로그아웃
              </AuthLink>
            </>
          ) : (
            <>
              <Name>{"로그인이 필요합니다."}</Name>
              <AuthLink to={ROUTE.LOGIN} onClick={onToggleNav}>
                로그인
              </AuthLink>
            </>
          )}
          {menuList.map(({ name, route }) => (
            <Menu
              key={name}
              to={route || ROUTE.HOME}
              activeStyle={{ backgroundColor: `${PALETTE.SECONDARY}` }}
              onClick={onToggleNav}
            >
              {name}
            </Menu>
          ))}
        </MenuWrapper>
      </Modal>
    </Container>
  );
};

export default MobileNav;
