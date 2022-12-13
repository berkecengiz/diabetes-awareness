import React, { useState, useEffect } from "react";
import { Stack, Flex, useToast, Image, Box, Slider, Text, SliderMark, SliderTrack, SliderFilledTrack, SliderThumb, Progress, Button, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { CheckIcon } from "@chakra-ui/icons";
import jwtDecode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

export const PatientHabbits = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [sliderValue, setSliderValue] = useState([
    {
      category: "coffee",
      name: "Coffee Usage",
      rate: 0,
      imgUrl: "https://static.vecteezy.com/system/resources/previews/000/449/568/original/vector-coffee-icon.jpg",
    },
    {
      category: "alcohol",
      name: "Alcohol Usage",
      rate: 0,
      imgUrl: "https://st4.depositphotos.com/18881412/27127/v/450/depositphotos_271278436-stock-illustration-glass-alcoholic-cocktail-decorated-slice.jpg",
    },
    {
      category: "sugar",
      name: "Sugar Intake",
      rate: 0,
      imgUrl: "https://st2.depositphotos.com/2524151/5854/i/450/depositphotos_58541653-stock-photo-cubes-of-cane-sugar-isolated.jpg",
    },
    {
      category: "salt",
      name: "Salt Intake",
      rate: 0,
      // imgUrl: "https://images.vexels.com/media/users/3/213417/isolated/preview/d34cc966ff20fcae46c7bead6f9e0832-pantry-salt-label-by-vexels.png",
      imgUrl: "https://images.vexels.com/media/users/3/256433/isolated/lists/729ac7eacc177d1fa1ee12f552646396-salt-shaker-spice-color-stroke.png",
    },
    {
      category: "bread",
      name: "Bread",
      rate: 0,
      // imgUrl: "https://images.vexels.com/media/users/3/213417/isolated/preview/d34cc966ff20fcae46c7bead6f9e0832-pantry-salt-label-by-vexels.png",
      imgUrl: "https://assets.bonappetit.com/photos/5f84743360f032defe1f5376/16:9/w_2192,h_1233,c_limit/Pullman-Loaf-Lede-new.jpg",
    },
    {
      category: "activity",
      name: "Activity",
      rate: 0,
      // imgUrl: "https://images.vexels.com/media/users/3/213417/isolated/preview/d34cc966ff20fcae46c7bead6f9e0832-pantry-salt-label-by-vexels.png",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzfoXGX_TRphXy4bRbDZVvu1DFGd_hvw4cng&usqp=CAU",
    },
    {
      category: "cigarette",
      name: "Cigarette",
      rate: 0,
      // imgUrl: "https://images.vexels.com/media/users/3/213417/isolated/preview/d34cc966ff20fcae46c7bead6f9e0832-pantry-salt-label-by-vexels.png",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToGB26_ECG0LzTjLK9C-vNsYwM6xy78tsmLQ&usqp=CAU",
    },
  ]);
  const [habbits, setHabbits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSuggestions();
  }, []);

  const getSuggestions = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("http://localhost:3000/habbits"); //api/v1/get_patient_habits
      setHabbits(data);
      setIsLoading(false);
    } catch (err) {
      console.log("Error", err);
    }
  };

  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  const handleOnChangeSlider = (val, index) => {
    const allHabbits = [...sliderValue];
    allHabbits[index].rate = val;
    setSliderValue(allHabbits);
  };

  const handleOnSubmit = async () => {
    const token = localStorage.getItem("access_token");
    const { sub: patient_id } = jwtDecode(token);
    // const habbit = sliderValue.find((e) => e.category === category);
    // const habbit2 = habbits.find((e) => e.category === category);
    // habbit.patient_id = patient_id;
    // const result = await axios.put(`http://127.0.0.1:3000/habbits?patient_id=${patient_id}`, habbit);
    // const result = await axios.put(`http://127.0.0.1:3000/habbits/${habbit2.id}`, habbit);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const habbitObject = {
        alcohol: sliderValue.find((e) => e.category === "alcohol").rate,
        sugar: sliderValue.find((e) => e.category === "sugar").rate,
        salt: sliderValue.find((e) => e.category === "salt").rate,
        smoking: sliderValue.find((e) => e.category === "cigarette").rate,
        coffee: sliderValue.find((e) => e.category === "coffee").rate,
        activity: sliderValue.find((e) => e.category === "activity").rate,
        bread: sliderValue.find((e) => e.category === "bread").rate,
      };
      console.log({ habbitObject });
      await axios.post("http://127.0.0.1:8000/api/v1/patient/create-habits", habbitObject, config);
      // getSuggestions();
      navigate("/home");
    } catch (err) {}
  };

  const percentageColor = (val) => {
    if (val <= 33) {
      return "green";
    } else if (val > 33 && val <= 66) {
      return "yellow";
    } else {
      return "red";
    }
  };

  return (
    <>
      <Box borderWidth='1px' rounded='lg' shadow='2px 1px 3px rgba(0,0,0,0.3)' p={6} m='10px auto' as='form'>
        {isLoading ? (
          <div className='flex h-screen w-full justify-center items-center'>
            <Spinner color='green.500' />
          </div>
        ) : (
          <div>
            <p className='flex font-bold text-3xl mt-10 justify-center items-center'>Please rate your consumption from 1 - 5</p>
            <p className='flex text-xl mt-10 justify-center items-center'>Please consider your usage from last 3 months </p>
            {habbits &&
              habbits.length > 0 &&
              sliderValue.length > 0 &&
              sliderValue.map((e, index) => (
                <Stack key={index}>
                  <div className='flex p-10 gap-x-2 items-center'>
                    <Image boxSize='150px' objectFit='cover' src={e.imgUrl} alt='Dan Abramov' />
                    <Text>{e.name}</Text>
                    <Box pt={6} pb={2} className='w-[70%] flex justify-around mx-auto'>
                      <Slider aria-label='slider-ex-6' onChange={(val) => handleOnChangeSlider(val, index)} value={e.rate} defaultValue={e.rate}>
                        <SliderMark value={0} {...labelStyles}>
                          0
                        </SliderMark>
                        <SliderMark value={20} {...labelStyles}>
                          1
                        </SliderMark>
                        <SliderMark value={40} {...labelStyles}>
                          2
                        </SliderMark>
                        <SliderMark value={60} {...labelStyles}>
                          3
                        </SliderMark>
                        <SliderMark value={80} {...labelStyles}>
                          4
                        </SliderMark>
                        <SliderMark value={100} {...labelStyles}>
                          5
                        </SliderMark>
                        <SliderMark value={e.rate} textAlign='center' bg='blue.500' color='white' mt='-10' ml='-5' w='12'></SliderMark>
                        <SliderTrack>
                          <SliderFilledTrack bg={(val) => percentageColor(e.rate)} />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                    </Box>
                    {/* <Button color={"green.500"} onClick={() => handleOnSubmit(e.category)}>
                      <CheckIcon className='mr-3' color={"green.500"} /> Update
                    </Button> */}
                  </div>
                </Stack>
              ))}
          </div>
        )}
        <Flex w='100%' justifyContent='end'>
          <Button w='7rem' colorScheme='green' variant='solid' onClick={handleOnSubmit}>
            Submit
          </Button>
        </Flex>
      </Box>
    </>
  );
};
