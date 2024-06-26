// Chakra Icons
// Chakra Imports
import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Stack, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
// Assets
import avatar1 from 'assets/img/avatars/avatar1.png';
import avatar2 from 'assets/img/avatars/avatar2.png';
import avatar3 from 'assets/img/avatars/avatar3.png';
// Custom Icons
import { ArgonLogoDark, ArgonLogoLight, ChakraLogoDark, ChakraLogoLight, ProfileIcon, SettingsIcon } from 'components/Icons/Icons';
// Custom Components
import { ItemContent } from 'components/Menu/ItemContent';
import { SearchBar } from 'components/Navbars/SearchBar/SearchBar';
import { SidebarResponsive } from 'components/Sidebar/Sidebar';
import { useUserState } from 'context/UserContext';
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import routes from 'routes.js';
import { useUserDispatch, signOut } from 'context/UserContext';
import logo from 'assets/svg/logo-2q.svg';
import { CookieStorage } from 'utils/cookie-storage';

export default function HeaderLinks(props) {
  const { variant, children, fixed, scrolled, secondary, onOpen, ...rest } = props;

  const { colorMode } = useColorMode();
  const { isAuthenticated } = useUserState();
  const userInfo = CookieStorage.getCurrentUser()
  console.log(userInfo);
  const userDispatch = useUserDispatch();
  const history = useHistory();

  // Chakra Color Mode
  let navbarIcon = fixed && scrolled ? useColorModeValue('gray.700', 'gray.200') : useColorModeValue('white', 'gray.200');
  let menuBg = useColorModeValue('white', 'navy.800');
  const notificationColor = useColorModeValue('gray.700', 'white');
  if (secondary) {
    navbarIcon = 'white';
  }

  const handleToProfile = () => {
    history.push({
      pathname: '/admin/profile',
    });
  }
  return (
    <Flex pe={{ sm: '0px', md: '16px' }} w={{ sm: '100%', md: 'auto' }} alignItems="center" flexDirection="row">
      {/* <SearchBar me="18px" /> */}
      {isAuthenticated ? (
        <Flex flexDirection="row" alignItems={'center'} mr={3}>
          <Menu>
            <MenuButton display="flex" flexDirection="row">
              <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
              <Text display={{ sm: 'none', md: 'inline-flex' }} color={navbarIcon}>
                {userInfo?.firstName} {userInfo?.lastName}
              </Text>
            </MenuButton>
            <MenuList padding={"0"} bg={menuBg}>
              <Flex flexDirection="column">
                <MenuItem padding={"10px 14px"} mb="10px">
                  <ItemContent
                    info={`${userInfo?.firstName} ${userInfo?.lastName}`}
                    boldInfo="Username"
                    aSrc={avatar1}
                  // additionalComponent={
                  //   <div onClick={() => signOut(userDispatch, history)}>
                  //     <Text color={notificationColor}>Log out</Text>
                  //   </div>
                  // }
                  />
                </MenuItem>
                <MenuItem _hover={{ color: "blue.600" }} color={"gray.500"} padding={"10px 14px"} onClick={() => handleToProfile()}>
                  <ProfileIcon w="22px" h="22px" me="0px" />
                  <Text ml={2} fontWeight="bold" >Profile</Text>
                </MenuItem>
                <Button width={"fit-content"} margin={"18px"} padding={"2px 18px"} onClick={() => signOut(userDispatch, history)}>
                  <Text fontWeight="bold" color={notificationColor}>Log out</Text>
                </Button>
              </Flex>
            </MenuList>
          </Menu>
        </Flex>
      ) : (
        <NavLink to="/auth/sign-in">
          <Button
            ms="0px"
            px="0px"
            me={{ sm: '2px', md: '16px' }}
            color={navbarIcon}
            variant="no-effects"
            rightIcon={document.documentElement.dir ? '' : <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />}
            leftIcon={document.documentElement.dir ? <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" /> : ''}
          >
            <Text display={{ sm: 'none', md: 'flex' }}>Sign In</Text>
          </Button>
        </NavLink>
      )}

      <SidebarResponsive
        hamburgerColor={'white'}
        logo={
          <Stack direction="row" spacing="12px" align="center" justify="center">
            {/* {colorMode === "dark" ? (
              <ArgonLogoLight w="74px" h="27px" />
            ) : (
              <ArgonLogoDark w="74px" h="27px" />
            )}
            <Box
              w="1px"
              h="20px"
              bg={colorMode === "dark" ? "white" : "gray.700"}
            />
            {colorMode === "dark" ? (
              <ChakraLogoLight w="82px" h="21px" />
            ) : (
              <ChakraLogoDark w="82px" h="21px" />
            )} */}
            <img src={logo} />
          </Stack>
        }
        colorMode={colorMode}
        secondary={props.secondary}
        routes={routes}
        {...rest}
      />
      {/* <SettingsIcon
        cursor="pointer"
        ms={{ base: "16px", xl: "0px" }}
        me="16px"
        onClick={props.onOpen}
        color={navbarIcon}
        w="18px"
        h="18px"
      /> */}
      {/* <Menu>
        <MenuButton>
          <BellIcon color={navbarIcon} w="18px" h="18px" />
        </MenuButton>
        <MenuList p="16px 8px" bg={menuBg}>
          <Flex flexDirection="column">
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="13 minutes ago"
                info="from Alicia"
                boldInfo="New Message"
                aName="Alicia"
                aSrc={avatar1}
              />
            </MenuItem>
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="2 days ago"
                info="by Josh Henry"
                boldInfo="New Album"
                aName="Josh Henry"
                aSrc={avatar2}
              />
            </MenuItem>
            <MenuItem borderRadius="8px">
              <ItemContent
                time="3 days ago"
                info="Payment succesfully completed!"
                boldInfo=""
                aName="Kara"
                aSrc={avatar3}
              />
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu> */}
    </Flex>
  );
}
