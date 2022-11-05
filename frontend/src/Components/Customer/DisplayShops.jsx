import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API } from '../../API/api_url'
import Shop_card from '../partials/Shop_card'
import { Center, Flex, Heading } from '@chakra-ui/react';

export default function DisplayShops() {
    const [shops, setshops] = useState([]);
    useEffect(() => {
        getAllShop();
    }, []);

    const getAllShop = async () => {
        // console.log('s///')
        const shops = await axios.get(`${API}/api/shop_register`)
        setshops(shops.data.userdata)
        console.log('shops are: ', shops)

    }
    return (
        <>
            <Heading mt={'20px'} isTruncated>
                <Center>
                    All Shop Details
                </Center>
            </Heading>
            <Flex justifyContent={'space-around'} alignContent={'space-between'} wrap={'wrap'}>
                {shops.length > 0 ? shops.map((val, ind) => (
                    <Shop_card
                        key={ind}
                        shop_id={val._id}
                        shop_name={val.shop_name}
                        owner_name={val.owner_name}
                        address={val.address}
                        area={val.area}
                        city={val.city}
                        pincode={val.pincode}
                        start_time={val.start_time}
                        end_time={val.end_time}
                        onClickLink={`/shopproducts/${val._id}`}
                        btnText={"View Products"}
                    />
                )) : "no found"}
            </Flex>
        </>
    )
}