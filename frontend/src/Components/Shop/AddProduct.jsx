import React from 'react'
import { API } from "../../API/api_url";
import {
    FormControl,
    FormLabel,
    Flex,
    Box,
    Input,
    InputGroup,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    Textarea,
    useToast
} from '@chakra-ui/react'
import { useState } from 'react'
const axios = require('axios')

export default function AddProduct() {
    const toast = useToast();
    const initalValue = {
        name: '',
        description: '',
        stock: '',
        price: '',
        tags: []
    }
    const [productDetail, setproductDetail] = useState(initalValue)
    const [image, setImage] = useState('')

    // // This will give a message in type of alert that can be remove in 3s
    const ShowToast = (details) => {
        toast({
            ...details,
            duration: 3000,
            isClosable: true,
            position: 'bottom-right',
            variant: localStorage.getItem('chakra-ui-color-mode') === 'light' ? 'subtle' : 'solid',
        })
    }

    const inputHandler = (e) => {
        const { name, value } = e.target;
        // console.log(name, value)
        setproductDetail((preVal) => {
            return {
                ...preVal,
                [name]: value
            }
        })
    }

    const inputImage = (e) => {
        console.log(e.target.files[0])
        setImage(e.target.files[0])
    }

    const onsubmit = async (e) => {
        e.preventDefault();
        // console.log(productDetail);
        const productDetail_split = {
            ...productDetail,
            tags: productDetail.tags.split(',')
        }
        console.log("Product Detail: ", productDetail_split);
        try {
            const res = await axios.post(`${API}/api/productDetail`, productDetail_split)
            // console.log(res);

            const formData = new FormData()
            formData.append('productImage', image)
            const res2 = await axios.post(`${API}/api/upload/${res.data.productDetail._id}`, formData, image)

            // console.log(res2)
            if (res.data.statusCode === 200) {
                setproductDetail(initalValue);
                ShowToast({
                    title: "Success!",
                    description: res.data.message,
                    status: 'success'
                })
                setImage('');
            }
        }
        catch (err) {
            ShowToast({
                title: "Error!",
                description: err.response.data.message,
                status: 'error'
            })
        }
    }

    return (
        <>
            <Flex
                minH={'90vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Add New Product
                        </Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}
                    >
                        <Stack spacing={4}>
                            <FormControl id="name" isRequired>
                                <FormLabel>Product Name</FormLabel>
                                <Input type="text" name="name" onChange={inputHandler} value={productDetail.name} />
                            </FormControl>

                            <FormControl id="description" isRequired>
                                <FormLabel>Description</FormLabel>
                                <Textarea placeholder='Add your detailed product description' name="description" onChange={inputHandler} value={productDetail.description} />
                                {/* <Input type="text"  /> */}
                            </FormControl>


                            <FormControl id="image" isRequired>
                                <FormLabel>Image</FormLabel>
                                <Input type="file" name="image" onChange={inputImage} /> {/* Value not given here check that */}
                            </FormControl>


                            <Stack spacing={5} direction='row'>
                                <FormControl id="stock" isRequired>
                                    <FormLabel>Stock</FormLabel>
                                    <InputGroup>
                                        <Input type='text' name='stock' onChange={inputHandler} value={productDetail.stock} />
                                    </InputGroup>
                                </FormControl>

                                <FormControl id="price" isRequired>
                                    <FormLabel>Price</FormLabel>
                                    <Input type="text" name="price" onChange={inputHandler} value={productDetail.price} />
                                </FormControl>
                            </Stack>

                            <FormControl id="tags" isRequired>
                                <FormLabel>Tags</FormLabel>
                                <Input type="text" name="tags" onChange={inputHandler} value={productDetail.tags} placeholder='add tegs sepreted by comma' />
                            </FormControl>


                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    onClick={onsubmit}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Add Product
                                </Button>

                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>

        </>)
}