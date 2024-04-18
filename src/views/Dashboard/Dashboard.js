import React, { useEffect, useState } from 'react';
import { Button, Flex, FormControl, FormLabel, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import Card from 'components/Card/Card.js';
import { useHistory } from 'react-router-dom';
import { formatDate } from 'utils/helpers';
import { getInitFilerChart } from 'utils/helpers';
import { CookieStorage } from 'utils/cookie-storage';
import BoxCard from 'components/BoxCard/BoxCard';
import { useQueryGetStatistic } from 'services/statistic';
import { useUserState } from 'context/UserContext';
import { IoIosPeople, IoIosCloudDone } from 'react-icons/io';
import { GrProductHunt } from 'react-icons/gr';
import { FaCommentAlt, FaBookOpen } from 'react-icons/fa';
import { AiOutlineTransaction } from 'react-icons/ai';
import { MdViewCozy, MdCampaign, MdPublishedWithChanges } from "react-icons/md";
import { MdCancelPresentation } from 'react-icons/md';
import DatePicker from 'components/DatePicker/DatePicker';
import moment from 'moment';
import { RiAdvertisementFill } from "react-icons/ri";

const initFiler = {
  endTime: getInitFilerChart().endDate,
  startTime: getInitFilerChart().startDate,
};

export default function Dashboard() {
  const isLoggedIn = CookieStorage.isAuthenticated();
  const history = useHistory();
  const { userInfo } = useUserState();
  const [filter, setFilter] = useState(initFiler);
  const { data: statistic } = useQueryGetStatistic({ enabled: CookieStorage.isAuthenticated() });
  console.log(statistic);

  useEffect(() => {
    if (!isLoggedIn) {
      return history.push('/auth/sign-in');
    }
  }, [isLoggedIn, history]);

  return (
    <>
      <Flex flexDirection="column" pt={{ base: '120px', md: '75px' }} gap={4}>
        <Card minH="125px" bgColor="white">
          <Heading fontWeight={500} fontSize={20} color="blue.500" mb={4}>
            Tổng quan
          </Heading>
          {/* <Flex justifyContent={'space-between'} alignItems={'end'} gap={'20px'} mt={'20px'} mb={10}>
            <Stack>
              <Flex alignItems={'center'} gap={'14px'} flexWrap={'wrap'}>
                <FormControl display="flex" flexDirection={'column'} width={{ base: 'full', sm: '300px' }}>
                  <FormLabel m="0">Ngày bắt đầu</FormLabel>
                  <DatePicker selectedDate={statisticFilter.startTime} onChange={date => onChangeDate('startTime')(date)} />
                </FormControl>
                <FormControl display="flex" flexDirection={'column'} width={{ base: 'full', sm: '300px' }}>
                  <FormLabel m="0">Ngày kết thúc</FormLabel>
                  <DatePicker
                    selectedDate={statisticFilter.endTime}
                    minDate={statisticFilter.startTime}
                    onChange={date => onChangeDate('endTime')(date)}
                  />
                </FormControl>
                <Button variant="second" border={'1px solid #4492E1'} color={'blue.500'} maxH="30px" alignSelf={'end'} onClick={onReset}>
                  Reset
                </Button>
                <Button variant="primary" maxH="40px" alignSelf={'end'} onClick={handleSearch}>
                  <Text fontSize="md" fontWeight="bold" cursor="pointer">
                    Tìm kiếm
                  </Text>
                </Button>
              </Flex>
            </Stack>
          </Flex> */}
          <Flex direction="column">
            <Flex paddingX={8} paddingY={5} rounded={10} backgroundColor="blue.500" flexDirection="row" align="center" w="100%" mb="25px">
              <Heading fontWeight={500} fontSize={18} color="white">
                Chào mừng đến với Fushion Gather! {userInfo?.username}
              </Heading>
            </Flex>
          </Flex>
          <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(250px, 1fr))" flexWrap={'wrap'} mb={4}>
            <BoxCard
              title="Tổng số thành viên"
              content={
                <Flex alignItems={'center'} gap={4}>
                  <IoIosPeople size={28} />
                  <Text fontWeight={600} fontSize={18}>
                    {statistic?.totalUsers}
                  </Text>
                </Flex>
              }
            />

            <BoxCard
              title="Tổng số sự kiện"
              content={
                <Flex alignItems={'center'} gap={4}>
                  <MdPublishedWithChanges size={28} />
                  <Text fontWeight={600} fontSize={18}>
                    {statistic?.totalEvents}
                  </Text>
                </Flex>
              }
            />
            <BoxCard
              title="Tổng số gian hàng"
              content={
                <Flex alignItems={'center'} gap={4}>
                  <MdViewCozy size={28} />
                  <Text fontWeight={600} fontSize={18}>
                    {statistic?.totalBooths}
                  </Text>
                </Flex>
              }
            />
            <BoxCard
              title="Tổng số ticket"
              content={
                <Flex alignItems={'center'} gap={4}>
                  <AiOutlineTransaction size={28} />
                  <Text fontWeight={600} fontSize={18}>
                    {statistic?.totalTickets}
                  </Text>
                </Flex>
              }
            />
            <BoxCard
              title="Tổng số người tham gia"
              content={
                <Flex alignItems={'center'} gap={4}>
                  <IoIosPeople size={28} />
                  <Text fontWeight={600} fontSize={18}>
                    {statistic?.totalVisitors}
                  </Text>
                </Flex>
              }
            />
          </SimpleGrid>
        </Card>
      </Flex>
    </>
  );
}
